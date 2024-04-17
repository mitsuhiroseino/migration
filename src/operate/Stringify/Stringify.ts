import { CONTENT_TYPE } from '../../constants';
import { Content } from '../../types';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { Operation } from '../types';
import { STRINGIFIER } from './constants';
import { StringifyConfig } from './types';

/**
 * オブジェクトや配列を文字列に変換する
 * @param content 処理対象
 * @param config 操作設定
 * @param params 1繰り返し毎のパラメーター
 * @param options オプション
 * @returns 処理結果
 */
const Stringify: Operation<Exclude<Content, Buffer>, StringifyConfig> = async (content, config, params) => {
  const { stringifier = 'json', args } = config;
  return STRINGIFIER[stringifier](content, args);
};
export default Stringify;
OperationFactory.register(OPERATION_TYPE.STRINGIFY, Stringify, [CONTENT_TYPE.OTHER, CONTENT_TYPE.TEXT]);
