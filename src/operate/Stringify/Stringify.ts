import { CONTENT_TYPE } from '../../constants';
import { Content } from '../../types';
import ImmutableOperationBase from '../ImmutableOperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import { STRINGIFIER } from './constants';
import { StringifyConfig } from './types';

/**
 * オブジェクトや配列を文字列に変換する
 */
class Stringify extends ImmutableOperationBase<Exclude<Content, Buffer>, StringifyConfig> {
  readonly contentTypes = [CONTENT_TYPE.DATA, CONTENT_TYPE.TEXT];

  protected async _operate(content: Exclude<Content, Buffer>, params: OperationParams): Promise<string> {
    const { stringifier = 'json', args } = this._config;
    return STRINGIFIER[stringifier](content, args);
  }
}
export default Stringify;
OperationFactory.register(OPERATION_TYPE.STRINGIFY, Stringify);
