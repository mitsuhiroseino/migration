import { CONTENT_TYPE } from '../../constants';
import replaceWithConfigs from '../../utils/replaceWithConfigs';
import OperationBase from '../OperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import { ReplaceConfig } from './types';

/**
 * 文字列を削除する操作
 */
class Replace extends OperationBase<string, ReplaceConfig> {
  readonly contentTypes = CONTENT_TYPE.TEXT;

  async operate(content: string, params: OperationParams): Promise<string> {
    return replaceWithConfigs(content, this._config, params);
  }
}
export default Replace;
OperationFactory.register(OPERATION_TYPE.REPLACE, Replace);
