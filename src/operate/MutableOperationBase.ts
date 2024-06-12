import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { OPERATION_STATUS } from '../constants';
import { Content, OperationResult } from '../types';
import OperationBase from './OperationBase';
import { OperationParams, TypedOperationConfig } from './types';

/**
 * 編集前と編集後のインスタンスが同じ値を扱う操作の基底クラス
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
  protected async _operate(content: C, params: OperationParams): Promise<OperationResult<C | Content>> {
    const before = cloneDeep(content);
    const result = await this._operateContent(content, params);
    if (!isEqual(before, result)) {
      return { operationStatus: OPERATION_STATUS.PROCESSED, content: result };
    } else {
      return { operationStatus: OPERATION_STATUS.UNPROCESSED, content: result };
    }
  }

  protected abstract _operateContent(content: C, params: OperationParams): Promise<C | Content>;
}
