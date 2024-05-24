import { CONTENT_TYPE } from '../../constants';
import replace from '../../utils/replace';
import ImmutableOperationBase from '../ImmutableOperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import { UnbomConfig } from './types';

/**
 * Bomを削除する操作
 */
class Unbom extends ImmutableOperationBase<string, UnbomConfig> {
  readonly contentTypes = CONTENT_TYPE.TEXT;

  protected async _operate(content: string, params: OperationParams): Promise<string> {
    // BOMの置換
    return replace(content, /^\ufeff/, '');
  }
}
export default Unbom;
OperationFactory.register(OPERATION_TYPE.UNBOM, Unbom);
