import { CONTENT_TYPE } from '../../constants';
import parse from '../../utils/parse';
import ImmutableOperationBase from '../ImmutableOperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import { ParseConfig } from './types';

/**
 * 文字列をオブジェクトや配列に変換する
 */
class Parse extends ImmutableOperationBase<string, ParseConfig> {
  readonly contentTypes = CONTENT_TYPE.TEXT;

  protected async _operateContent(content: string, params: OperationParams): Promise<any> {
    const { parser: parserOptions } = this._config;
    return parse(content, parserOptions);
  }
}
export default Parse;
OperationFactory.register(OPERATION_TYPE.PARSE, Parse);
