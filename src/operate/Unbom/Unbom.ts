import { CONTENT_TYPE } from '../../constants';
import replace from '../../utils/replace';
import OperationBase from '../OperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import { UnbomConfig } from './types';

/**
 * Bomを削除する操作
 */
class Unbom extends OperationBase<string, UnbomConfig> {
  readonly contentTypes = CONTENT_TYPE.TEXT;

  async operate(content: string, params: OperationParams): Promise<string> {
    // BOMの置換
    return replace(content, /^\ufeff/, '');
  }
}
export default Unbom;
OperationFactory.register(OPERATION_TYPE.UNBOM, Unbom);
