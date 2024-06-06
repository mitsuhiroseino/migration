import { OPERATION_STATUS } from '../../constants';
import { Output, OutputConfig } from '../../io';
import OutputFactory from '../../io/OutputFactory';
import { Content, OperationResult, VariableString } from '../../types';
import finishDynamicValue, { FinishDynamicValueOptions } from '../../utils/finishDynamicValue';
import getIoConfig from '../../utils/getIoConfig';
import inheritConfig from '../../utils/inheritConfig';
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

    // 初期化処理
    await this._output.activate(params);

    // パラメーター名
    const prmsName: string = finishDynamicValue(this._paramName, params, this._paramNameOptions);

    // ファイルの出力
    const resource = params[prmsName];
    await this._output.write(resource, params);

    // 完了処理
    await this._output.deactivate(params);

    return { operationStatus: OPERATION_STATUS.UNPROCESSED, content };
  }
}
export default Write;
OperationFactory.register(OPERATION_TYPE.WRITE, Write);
