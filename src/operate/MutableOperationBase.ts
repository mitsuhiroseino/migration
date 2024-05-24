import { Content } from '../types';
import OperationBase from './OperationBase';
import { OPERATION_STATUS } from './constants';
import { OperationParams, OperationResult, TypedOperationConfig } from './types';

/**
 * 編集前と編集後のインスタンスが異なる値を扱う操作の基底クラス
 */
export default abstract class MutableOperationBase<
  C extends Content = Content,
  OC extends TypedOperationConfig = TypedOperationConfig,
> extends OperationBase<C, OC> {
  /**
   * コンテンツの操作
   * @param content
   * @param params
   */
  async operate(content: C, params: OperationParams): Promise<OperationResult<C | Content>> {
    const result = await this._operate(content, params);
    if (content !== result) {
      return { status: OPERATION_STATUS.CHANGED, content: result };
    } else {
      return { status: OPERATION_STATUS.UNCHANGED, content: result };
    }
  }

  protected abstract _operate(content: C, params: OperationParams): Promise<C | Content>;
}
