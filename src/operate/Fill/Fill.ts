import { CONTENT_TYPE } from '../../constants';
import replacePlaceholders from '../../utils/replacePlaceholders';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { Operation } from '../types';
import { FillConfig } from './types';

/**
 * 文字列のプレイスホルダーに値を埋め込む操作
 * @param content 処理対象
 * @param config 操作設定
 * @param params 1繰り返し毎のパラメーター
 * @returns 処理結果
 */
const Fill: Operation<string, FillConfig> = async (content, config, params) => {
  return replacePlaceholders(content, params, config);
};
export default Fill;
OperationFactory.register(OPERATION_TYPE.FILL, Fill, CONTENT_TYPE.TEXT);
