import { OPERATION_TYPE } from '../constants';
import { OperationConfigBase } from '../types';
import { STRINGIFIER } from './constants';

type Stringifier = keyof typeof STRINGIFIER;

/**
 * オブジェクトや配列を文字列に変換する
 */
export type StringifyConfig = OperationConfigBase<typeof OPERATION_TYPE.STRINGIFY> & {
  /**
   * ストリンギファー
   */
  stringifier?: Stringifier;

  /**
   * ストリンギファーに渡す引数
   */
  args: any[];
};
