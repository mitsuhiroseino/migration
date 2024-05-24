import { Input, InputConfig } from '../../io';
import getIoConfig from '../../io/helpers/getIoConfig';
import { InputFactory } from '../../io/inputs';
import { Content, DiffParams, VariableString } from '../../types';
import asArray from '../../utils/asArray';
import assignParams from '../../utils/assignParams';
import finishDynamicValue, { FinishDynamicValueOptions } from '../../utils/finishDynamicValue';
import inheritConfig from '../../utils/inheritConfig';
import OperationBundlerBase from '../OperationBundlerBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { OperationParams, OperationResult } from '../types';
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
    const inputCfg = getIoConfig(input, 'inputPath');
    const inputConfig: InputConfig = inheritConfig(inputCfg, rest);
    this._input = InputFactory.create(inputConfig);

    this._paramName = paramName;
    this._paramNameOptions = { ...rest, preserveString: preserveParamName };
  }

  async operate(content: Content, params: OperationParams): Promise<OperationResult<Content>> {
    const resources: DiffParams = {};
    const paramNames: any = {};

    // 初期化処理
    await this._input.initialize(params);

    // リソースの取得
    const inputItems = await this._input.read(params);

    for await (const inputItem of inputItems) {
      // 入力時の結果をパラメーターにマージ
      let newParams = assignParams(params, inputItem.result);
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
    }

    // 完了処理
    await this._input.complete(params);

    // 子要素で処理
    return super.operate(content, { ...params, ...resources });
  }
}
export default Read;
OperationFactory.register(OPERATION_TYPE.READ, Read);
