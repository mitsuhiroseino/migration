import { CONTENT_TYPE } from '../../constants';
import replaceWithConfigs from '../../utils/replaceWithConfigs';
import ImmutableOperationBase from '../ImmutableOperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import { ReplaceConfig } from './types';

/**
 * 文字列を削除する操作
 */
class Replace extends ImmutableOperationBase<string, ReplaceConfig> {
  readonly contentTypes = CONTENT_TYPE.TEXT;

  protected async _operate(content: string, params: OperationParams): Promise<string> {
    return replaceWithConfigs(content, this._config, params);
  }
}
export default Replace;
OperationFactory.register(OPERATION_TYPE.REPLACE, Replace);
