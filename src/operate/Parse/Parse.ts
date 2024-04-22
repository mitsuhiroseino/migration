import { CONTENT_TYPE } from '../../constants';
import OperationBase from '../OperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import { PARSER } from './constants';
import { ParseConfig } from './types';

/**
 * 文字列をオブジェクトや配列に変換する
 */
class Parse extends OperationBase<string, ParseConfig> {
  readonly contentTypes = CONTENT_TYPE.TEXT;

  async operate(content: string, params: OperationParams): Promise<string> {
    const { parser = 'json', args } = this._config;
    return PARSER[parser](content, args);
  }
}
export default Parse;
OperationFactory.register(OPERATION_TYPE.PARSE, Parse);
