import { OPERATION_STATUS } from '../../constants';
import { IO_TYPE, InputFactory, IoHandler, IoHandlerConfig } from '../../io';
import { Content, OperationResult } from '../../types';
import finishDynamicValue, { FinishDynamicValueOptions } from '../../utils/finishDynamicValue';
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
   * 入出力ハンドラー
   */
  private _ioHandler: IoHandler;

  private _paramNameOptions: FinishDynamicValueOptions;

  constructor(config: WriteConfig) {
    super(config);

    const { type, output, paramName = '_resource', preserveParamName, ...rest } = config;

    // 出力設定取得
    const ioHandlerConfig: IoHandlerConfig = inheritConfig({ output }, rest);
    this._ioHandler = new IoHandler(ioHandlerConfig);
    this._paramNameOptions = { ...rest, preserveString: preserveParamName };
  }

  async operate(content: Content, params: OperationParams): Promise<OperationResult<Content>> {
    const { writeEach, paramName } = this._config;

    let target;
    if (this._config.resourceType === 'content') {
      // コンテンツをリソースとして取得
      target = content;
    } else {
      // パラメーター名
      const name: string = finishDynamicValue(paramName, params, this._paramNameOptions);
      // パラメーターからリソースを取得
      target = params[name];
    }

    let returnValues;
    if (writeEach && Array.isArray(target)) {
      // 配列の場合に個々の要素を出力する
      returnValues = target.map((item) => ({ content: item, result: {} }));
    } else {
      // 纏めて出力する
      returnValues = { content: target, result: {} };
    }

    // returnValuesを入力とするinput
    const input = InputFactory.create({
      type: IO_TYPE.DATA,
      returnValues,
    });

    await this._ioHandler.handle(params, { input });

    return { operationStatus: OPERATION_STATUS.UNPROCESSED, content };
  }
}
export default Write;
OperationFactory.register(OPERATION_TYPE.WRITE, Write);
