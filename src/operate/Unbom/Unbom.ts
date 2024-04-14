import { CONTENT_TYPE } from '../../constants';
import replace from '../../utils/replace';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { Operation, OperationParams } from '../types';
import { UnbomConfig } from './types';

/**
 * Bomを削除する操作
 * @param content 処理対象
 * @param config 操作設定
 * @param params 1繰り返し毎のパラメーター
 * @param options オプション
 * @returns 処理結果
 */
const Unbom: Operation<string, UnbomConfig> = async (content: string, config: UnbomConfig, params: OperationParams) => {
  // 置換の実行
  return replace(content, /^\ufeff/, '');
};
export default Unbom;
OperationFactory.register(OPERATION_TYPE.UNBOM, Unbom, CONTENT_TYPE.TEXT);
