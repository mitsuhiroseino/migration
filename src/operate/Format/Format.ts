import { CONTENT_TYPE } from '../../constants';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { Operation, OperationParams } from '../types';
import { FormatConfig } from './types';

/**
 * 文字列を整形する操作
 * @param content 処理対象
 * @param config 操作設定
 * @param params 1繰り返し毎のパラメーター
 * @returns 処理結果
 */
const Format: Operation<string, FormatConfig> = async (
  content: string,
  config: FormatConfig,
  params: OperationParams,
) => {
  const { formatter, formatterOptions } = config;
  return await formatter(content, formatterOptions);
};
export default Format;
OperationFactory.register(OPERATION_TYPE.FORMAT, Format, CONTENT_TYPE.TEXT);
