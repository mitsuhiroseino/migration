import { CONTENT_TYPE } from '../../constants';
import OperationFactory from '../OperationFactory';
import Replace from '../Replace';
import { OPERATION_TYPE } from '../constants';
import { Operation } from '../types';
import { DeleteConfig } from './types';

/**
 * 文字列を削除する操作
 * @param content 処理対象
 * @param config 操作設定
 * @param params 1繰り返し毎のパラメーター
 * @returns 処理結果
 */
const Delete: Operation<string, DeleteConfig> = async (content, config, params) => {
  const { type, ...rest } = config;
  return Replace(content, { ...rest, replacement: '' }, params);
};
export default Delete;
OperationFactory.register(OPERATION_TYPE.DELETE, Delete, CONTENT_TYPE.TEXT);
