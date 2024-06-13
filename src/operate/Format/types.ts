import { FormatOptions } from '../../utils/format';
import { Condition } from '../../utils/isMatch';
import { OPERATION_TYPE } from '../constants';
import { OperationConfigBase } from '../types';

/**
 * フォーマットの設定
 */
export type FormatConfig<O = FormatOptions> = OperationConfigBase<typeof OPERATION_TYPE.FORMAT> & {
  /**
   * 任意のフォーマッター
   * 未指定の場合はprettir
   * @param content 処理対象
   * @param options フォーマッターのオプション
   * @returns
   */
  formatter?: (content: string, options: O) => Promise<string>;

  /**
   * 条件に合致した場合のみ適用するフォーマットオプション
   * 先勝ち
   */
  conditionalFormats: { condition: Condition; formatOptions: O } | { condition: Condition; formatOptions: O }[];
};
