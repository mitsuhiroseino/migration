import { CONTENT_TYPE } from '../../constants';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { Operation, OperationParams } from '../types';
import { PARSER } from './constants';
import { ParseConfig } from './types';

/**
 * 文字列をオブジェクトや配列に変換する
 * @param content 処理対象
 * @param config 操作設定
 * @param params 1繰り返し毎のパラメーター
 * @param options オプション
 * @returns 処理結果
 */
const Parse: Operation<string, ParseConfig> = async (content: string, config: ParseConfig, params: OperationParams) => {
  const { parser = 'json', args } = config;
  return PARSER[parser](content, args);
};
export default Parse;
OperationFactory.register(OPERATION_TYPE.PARSE, Parse, CONTENT_TYPE.TEXT);
