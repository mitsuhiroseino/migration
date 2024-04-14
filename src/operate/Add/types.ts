import { FlexiblePattern } from '../../utils/replace';
import { OPERATION_TYPE } from '../constants';
import { OperationConfigBase } from '../types';

/**
 * 文字列追加の設定
 */
export type AddConfig = OperationConfigBase<typeof OPERATION_TYPE.ADD> & {
  /**
   * 追加する位置のアンカー
   */
  patterns?: FlexiblePattern | FlexiblePattern[];

  /**
   * patternsの要素のプレイスホルダーを置換するなどの前処理を行わない
   */
  preservePatterns?: boolean;

  /**
   * 追加する文字列
   */
  additionalString: string;

  /**
   * additionalStringのプレイスホルダーを置換するなどの前処理を行わない
   */
  preserveAdditionalString?: boolean;

  /**
   * 追加位置
   */
  addPosition?: 'before' | 'after';
};
