import { Content, OperationResult } from '../types';
import toOperations from '../utils/toOperations';
import OperationBase from './OperationBase';
import operate from './operate';
import { Operation, OperationBundlerConfig, OperationParams, TypedOperationConfig } from './types';

/**
 * 複数の操作を纏める操作の基盤
 */
export default abstract class OperationBundlerBase<
  C extends Content = Content,
  OC extends TypedOperationConfig & OperationBundlerConfig = TypedOperationConfig & OperationBundlerConfig,
> extends OperationBase<C, OC> {
  protected _operations: Operation<any>[];

  constructor(config: OC) {
    super(config);
    const { operations } = config;
    this._operations = toOperations(operations, config);
  }

  /**
   * コンテンツの操作
   * @param content
   * @param params
   */
  protected async _operate(content: C, params: OperationParams): Promise<OperationResult<C | Content>> {
    const result = await operate(content, this._operations, params);
    if (!this._config.scopedParams) {
      // 現在のパラメーターを後続のオペレーションにも適用する
      result.params = params;
    }
    return result;
  }
}
