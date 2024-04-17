import { Content } from '../../types';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { Operation } from '../types';
import { EditConfig } from './types';

/**
 * 任意の編集をする操作
 * @param content 処理対象
 * @param config 操作設定
 * @param params 1繰り返し毎のパラメーター
 * @returns 処理結果
 */
const Edit: Operation<Content, EditConfig> = async (content, config, params) => {
  let { editContent } = config;
  // 実行
  return await editContent(content, params);
};
export default Edit;
OperationFactory.register(OPERATION_TYPE.EDIT, Edit);
