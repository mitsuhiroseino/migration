import { OPERATION_STATUS } from '../../constants';
import { Output, OutputConfig } from '../../io';
import OutputFactory from '../../io/OutputFactory';
import { Content, OperationResult, VariableString } from '../../types';
import asArray from '../../utils/asArray';
import assignParams from '../../utils/assignParams';
import finishDynamicValue, { FinishDynamicValueOptions } from '../../utils/finishDynamicValue';
import getIoConfig from '../../utils/getIoConfig';
import inheritConfig from '../../utils/inheritConfig';
import propagateError from '../../utils/propagateError';
import OperationBase from '../OperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import { WriteConfig } from './types';

/**
 * ファイルを出力する操作
 */
class Write extends OperationBase<Content, WriteConfig> {
  /**
   * 入力処理
   */
  private _output: Output<any, any>;

  private _paramName: VariableString<OperationParams>;

  private _paramNameOptions: FinishDynamicValueOptions;

  constructor(config: WriteConfig) {
    super(config);

    const { type, output, paramName = '_resource', preserveParamName, ...rest } = config;

    // 出力設定取得
    const outputCfg = getIoConfig(output, true);
    const outputConfig: OutputConfig = inheritConfig(outputCfg, rest);
    this._output = OutputFactory.create(outputConfig);

    this._paramName = paramName;
    this._paramNameOptions = { ...rest, preserveString: preserveParamName };
  }

  async operate(content: Content, params: OperationParams): Promise<OperationResult<Content>> {
    if (this._config.dryRun) {
      return content;
    }

    const output = this._output;
    // 初期化処理
    const activateResult = await output.activate(params);
    const activatedParams = assignParams(params, activateResult);

    let resources;
    if (this._config.resourceType === 'content') {
      // コンテンツをリソースとして取得
      resources = asArray(content);
    } else {
      // パラメーター名
      const prmsName: string = finishDynamicValue(this._paramName, activatedParams, this._paramNameOptions);
      // パラメーターからリソースを取得
      resources = asArray(params[prmsName]);
    }

    // ファイルの出力
    for (const resource of resources) {
      let newParams = activatedParams;
      try {
        // 前処理
        const startResult = await output.start(newParams);
        newParams = assignParams(newParams, startResult);

        const writeResult = await output.write(resource, newParams);
        newParams = assignParams(newParams, writeResult.result);

        // 後処理
        await output.end(newParams);
      } catch (error) {
        // エラー処理
        const errorResult = await output.error(newParams);
        newParams = assignParams(newParams, errorResult);
        throw propagateError(error, `${newParams._outputItem}`);
      }
    }

    // 完了処理
    await output.deactivate(activatedParams);

    return { operationStatus: OPERATION_STATUS.UNPROCESSED, content };
  }
}
export default Write;
OperationFactory.register(OPERATION_TYPE.WRITE, Write);
