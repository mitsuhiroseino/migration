import { CONTENT_TYPE } from '../../constants';
import replacePlaceholders from '../../utils/replacePlaceholders';
import OperationBase from '../OperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import { FillConfig } from './types';

/**
 * 文字列のプレイスホルダーに値を埋め込む操作
 */
class Fill extends OperationBase<string, FillConfig> {
  readonly contentTypes = CONTENT_TYPE.TEXT;

  async operate(content: string, params: OperationParams): Promise<string> {
    return replacePlaceholders(content, params, this._config);
  }
}
export default Fill;
OperationFactory.register(OPERATION_TYPE.FILL, Fill);
