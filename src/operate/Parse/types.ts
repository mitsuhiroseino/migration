import { OPERATION_TYPE } from '../constants';
import { OperationConfigBase } from '../types';
import { PARSER } from './constants';

type Parser = keyof typeof PARSER;

/**
 * 文字列をオブジェクトや配列に変換する
 */
export type ParseConfig = OperationConfigBase<typeof OPERATION_TYPE.PARSE> & {
  /**
   * 使用するパーサー
   * デフォルトは'json'
   */
  parser?: Parser;

  /**
   * パーサーに渡す引数
   */
  args: any[];
};
