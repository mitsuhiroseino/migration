import { CONTENT_TYPE } from '../../constants';
import asArray from '../../utils/asArray';
import format from '../../utils/format';
import isMatch from '../../utils/isMatch';
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

  protected async _operateContent(content: string, params: OperationParams): Promise<string> {
    const { formatter = format, formatterOptions, conditionalFormats } = this._config;
    const options = asArray(conditionalFormats).find(({ condition }) => isMatch(params, condition)) || formatterOptions;
    return await formatter(content, options);
  }
}
export default Format;
OperationFactory.register(OPERATION_TYPE.FORMAT, Format);
