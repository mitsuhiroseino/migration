import { Content } from '../types';
import asArray from '../utils/asArray';
import OperationBase from './OperationBase';
import OperationFactory from './OperationFactory';
import operate from './operate';
import { Operation, OperationParams, ParentOperationConfig, TypedOperationConfig } from './types';

/**
 * 子要素を持つ操作の基盤
 */
export default abstract class ParentOperationBase<
  C extends Content = Content,
  OC extends TypedOperationConfig & ParentOperationConfig<Content> = TypedOperationConfig &
    ParentOperationConfig<Content>,
> extends OperationBase<C, OC> {
  private _operations: Operation<any>[];

  constructor(config: OC) {
    super(config);
    const { operations } = config;
    this._operations = asArray(operations).map((operation) => {
      if (operation instanceof OperationBase) {
        return operation;
      } else {
        return OperationFactory.create(operation);
      }
    });
  }

  /**
   * コンテンツの操作
   * @param content
   * @param params
   */
  async operate(content: C, params: OperationParams): Promise<C | Content> {
    const result = await operate(content, this._operations, params);
    return result.content;
  }
}
