import isFunction from 'lodash/isFunction';

import { Content } from '../types';
import asArray from '../utils/asArray';
import operate from './operate';
import { OperationParams, ParentOperation, ParentOperationConfigBase } from './types';

/**
 * 子要素を持つ操作の基盤
 * @param content 処理対象
 * @param config 操作設定
 * @param params 1繰り返し毎のパラメーター
 * @returns 処理結果
 */
const ParentOperationBase: ParentOperation<Content, ParentOperationConfigBase> = async (
  content: Content,
  config: ParentOperationConfigBase<Content>,
  params: OperationParams
) => {
  let { operations } = config;
  if (isFunction(operations)) {
    operations = await operations(content, params);
  }
  operations = asArray(operations);

  const result = await operate(content, operations, params);
  return result.content;
};
export default ParentOperationBase;
