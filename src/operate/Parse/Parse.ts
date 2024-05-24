import { CONTENT_TYPE } from '../../constants';
import ImmutableOperationBase from '../ImmutableOperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import { PARSER } from './constants';
import { ParseConfig } from './types';

/**
 * 文字列をオブジェクトや配列に変換する
 */
class Parse extends ImmutableOperationBase<string, ParseConfig> {
  readonly contentTypes = CONTENT_TYPE.TEXT;

  protected async _operate(content: string, params: OperationParams): Promise<any> {
    const { parser = 'json', args } = this._config;
    return PARSER[parser](content, args);
  }
}
export default Parse;
OperationFactory.register(OPERATION_TYPE.PARSE, Parse);
