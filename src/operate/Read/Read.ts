import { Input, InputConfig } from '../../io';
import InputFactory from '../../io/InputFactory';
import { Content, DiffParams, OperationResult, VariableString } from '../../types';
import asArray from '../../utils/asArray';
import assignParams from '../../utils/assignParams';
import finishDynamicValue, { FinishDynamicValueOptions } from '../../utils/finishDynamicValue';
import getIoConfig from '../../utils/getIoConfig';
import inheritConfig from '../../utils/inheritConfig';
import propagateError from '../../utils/propagateError';
import OperationBundlerBase from '../OperationBundlerBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import { ReadConfig } from './types';

/**
 * ファイルを入力して内容をparamsに設定する操作
 */
class Read extends OperationBundlerBase<Content, ReadConfig> {
  /**
   * 入力処理
   */
  private _input: Input<any, any>;

  private _paramName: VariableString<OperationParams>;

  private _paramNameOptions: FinishDynamicValueOptions;

  constructor(config: ReadConfig) {
    super(config);

    const { type, input, paramName = '_resource', preserveParamName, ...rest } = config;

    // 入力設定取得
    const inputCfg = getIoConfig(input);
    const inputConfig: InputConfig = inheritConfig(inputCfg, rest);
    this._input = InputFactory.create(inputConfig);

    this._paramName = paramName;
    this._paramNameOptions = { ...rest, preserveString: preserveParamName };
  }

  async operate(content: Content, params: OperationParams): Promise<OperationResult<Content>> {
    const resources: DiffParams = {};
    const paramNames: any = {};
    const input = this._input;

    // 初期化処理
    const activateResult = await input.activate(params);
    const activatedParams = assignParams(params, activateResult);

    // リソースの取得
    const inputIterator = await input.read(activatedParams);

    // 入力を回す
    while (true) {
      let newParams = activatedParams;
      try {
        // 前処理
        const startResult = await input.start(newParams);
        newParams = assignParams(newParams, startResult);

        const next = await inputIterator.next();

        if (next.done) {
          // イテレーターが終わった時はbreak
          break;
        }
        const inputItem = next.value;

        // 入力時の結果をパラメーターにマージ
        newParams = assignParams(newParams, inputItem.result);

        // パラメーター名
        const prmsName: string = finishDynamicValue(this._paramName, newParams, this._paramNameOptions);
        if (paramNames[prmsName]) {
          // 以前と同じパラメーター名が帰ってきた時は配列にする
          const resource = asArray(resources[prmsName]);
          resource.push(inputItem.content);
          resources[prmsName] = resource;
        } else {
          resources[prmsName] = inputItem.content;
        }
        paramNames[prmsName] = true;

        // 後処理
        await input.end(newParams);
      } catch (error) {
        // エラー処理
        const errorResult = await input.error(newParams);
        newParams = assignParams(newParams, errorResult);
        throw propagateError(error, `${newParams._inputItem}`);
      }
    }
    // 完了処理
    await input.deactivate(activatedParams);

    // 子要素で処理
    return super.operate(content, { ...params, ...resources });
  }
}
export default Read;
OperationFactory.register(OPERATION_TYPE.READ, Read);
