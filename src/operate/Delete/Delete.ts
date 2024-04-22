import { CONTENT_TYPE } from '../../constants';
import OperationFactory from '../OperationFactory';
import Replace from '../Replace';
import { OPERATION_TYPE } from '../constants';
import { DeleteConfig } from './types';

/**
 * 文字列を削除する操作
 */
class Delete extends Replace {
  readonly contentTypes = CONTENT_TYPE.TEXT;

  constructor({ type, ...rest }: DeleteConfig) {
    super({ ...rest, replacement: '' });
  }
}
export default Delete;
OperationFactory.register(OPERATION_TYPE.DELETE, Delete);
