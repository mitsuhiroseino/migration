import { CONTENT_TYPE } from '../../constants';
import format from '../../utils/format';
import ImmutableOperationBase from '../ImmutableOperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import { FormatConfig } from './types';

/**
 * 文字列を整形する操作
 */
class Format extends ImmutableOperationBase<string, FormatConfig> {
  readonly contentTypes = CONTENT_TYPE.TEXT;

  protected async _operate(content: string, params: OperationParams): Promise<string> {
    const { formatter = format, formatterOptions } = this._config;
    return await formatter(content, formatterOptions);
  }
}
export default Format;
OperationFactory.register(OPERATION_TYPE.FORMAT, Format);
