import { ParseOptions } from '../../utils/parse';
import { OPERATION_TYPE } from '../constants';
import { OperationConfigBase } from '../types';

/**
 * 文字列をオブジェクトや配列に変換する
 */
export type ParseConfig = OperationConfigBase<typeof OPERATION_TYPE.PARSE> & {
  /**
   * パーサー
   */
  parser?: ParseOptions;
};
