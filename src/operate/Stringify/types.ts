import { StringifyOption } from '../../utils/stringify';
import { OPERATION_TYPE } from '../constants';
import { OperationConfigBase } from '../types';

/**
 * オブジェクトや配列を文字列に変換する
 */
export type StringifyConfig = OperationConfigBase<typeof OPERATION_TYPE.STRINGIFY> & {
  /**
   * ストリンギファー
   */
  stringifier?: StringifyOption;
};
