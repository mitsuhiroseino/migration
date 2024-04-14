import { Content } from '../../types';
import OperationFactory from '../OperationFactory';
import ParentOperationBase from '../ParentOperationBase';
import { OPERATION_TYPE } from '../constants';
import { OperationParams, ParentOperation } from '../types';
import { BundleConfig } from './types';

/**
 * 複数の操作を纏めた操作
 * 設定のoperationsを関数で定義すれば、コンテンツの内容に応じて処理を変更することが可能
 * @param content 処理対象
 * @param config 操作設定
 * @param params 1繰り返し毎のパラメーター
 * @returns 処理結果
 */
const Bundle: ParentOperation<Content, BundleConfig> = async (
  content: Content,
  config: BundleConfig<Content>,
  params: OperationParams
) => {
  return await ParentOperationBase(content, config, params);
};
export default Bundle;
OperationFactory.register(OPERATION_TYPE.BUNDLE, Bundle);
