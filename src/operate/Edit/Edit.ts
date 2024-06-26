import ImmutableOperationBase from '../ImmutableOperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import { EditConfig } from './types';

/**
 * 任意の編集をする操作
 */
class Edit extends ImmutableOperationBase<string, EditConfig> {
  protected async _operateContent(content: string, params: OperationParams): Promise<string> {
    // 実行
    return await this._config.editContent(content, params);
  }
}
export default Edit;
OperationFactory.register(OPERATION_TYPE.EDIT, Edit);
