import { INHERITED_COMMON_CONFIGS, OPERATION_STATUS } from '../../constants';
import { IoHandler, IoHandlerConfig } from '../../io';
import { Content, DiffParams, IterationParams, OperationResult, VariableString } from '../../types';
import asArray from '../../utils/asArray';
import finishDynamicValue, { FinishDynamicValueOptions } from '../../utils/finishDynamicValue';
import inheritConfig from '../../utils/inheritConfig';
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
   * 入出力ハンドラー
   */
  private _ioHandler: IoHandler;

  private _paramName: VariableString<OperationParams>;

  private _paramNameOptions: FinishDynamicValueOptions;

  constructor(config: ReadConfig) {
    super(config);

    const { type, input, paramName = '_resource', preserveParamName, ...rest } = config;

    // 入力設定取得
    const ioHandlerConfig: IoHandlerConfig = inheritConfig({ input }, rest, INHERITED_COMMON_CONFIGS);
    this._ioHandler = new IoHandler(ioHandlerConfig);
    this._paramName = paramName;
    this._paramNameOptions = { ...rest, preserveString: preserveParamName };
  }

  protected async _operate(content: Content, params: OperationParams): Promise<OperationResult<Content>> {
    const resources: DiffParams = {};

    // IoHandlerで読み込まれたコンテンツに対する操作
    const operationFn = <C>(readedContent: C, params: IterationParams) => {
      // パラメーター名
      const prmsName: string = finishDynamicValue(this._paramName, params, this._paramNameOptions);
      if (resources[prmsName]) {
        // 既に設定されているパラメーター名が帰ってきた時は値を配列にする
        const resource = asArray(resources[prmsName]);
        resource.push(readedContent);
        resources[prmsName] = resource;
      } else {
        resources[prmsName] = readedContent;
      }

      return Promise.resolve({ content: readedContent, operationStatus: OPERATION_STATUS.UNPROCESSED });
    };

    await this._ioHandler.handle(params, { operationFn });

    // 子要素で処理
    return await super._operate(content, { ...params, ...resources });
  }
}
export default Read;
OperationFactory.register(OPERATION_TYPE.READ, Read);
