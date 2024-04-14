import { Content } from '../../types';
import OperationFactory from '../OperationFactory';
import ParentOperationBase from '../ParentOperationBase';
import { OPERATION_TYPE } from '../constants';
import { Operation, OperationParams } from '../types';
import { ParamsConfig } from './types';

/**
 * 文字列を抜き出し、別のファイルに追加する操作
 * @param content 処理対象
 * @param config 操作設定
 * @param params 1繰り返し毎のパラメーター
 * @param options オプション
 * @returns 処理結果
 */
const Params: Operation<Content, ParamsConfig> = async (
  content: Content,
  config: ParamsConfig<Content>,
  params: OperationParams,
) => {
  const { type, createDiff, ...rest } = config;
  // パラメーターの更新
  const diff = await createDiff(content, { ...params });
  // 新しいパラメーターで子操作を実行
  return await ParentOperationBase(content, rest, { ...params, ...diff });
};
export default Params;
OperationFactory.register(OPERATION_TYPE.PARAMS, Params);
