import { Content } from '../types';
import toOperations from '../utils/toOperations';
import OperationBase from './OperationBase';
import operate from './operate';
import { Operation, OperationParams, ParentOperationConfig, TypedOperationConfig } from './types';

/**
 * 子要素を持つ操作の基盤
 */
export default abstract class ParentOperationBase<
  C extends Content = Content,
  OC extends TypedOperationConfig & ParentOperationConfig = TypedOperationConfig & ParentOperationConfig,
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
  async operate(content: C, params: OperationParams): Promise<C | Content> {
    const result = await operate(content, this._operations, params);
    return result;
  }
}
