import { IO_TYPE } from '../constants';
import { InputConfigBase, InputResultBase, OutputConfigBase, OutputResultBase } from '../types';

/**
 * データ入力
 */
export type DataInputConfig = InputConfigBase<typeof IO_TYPE.DATA> & {
  /**
   * 任意のデータ
   */
  content: any;

  /**
   * データ入力時の処理結果
   */
  result?: DataInputResult;
};

/**
 * データ入力時の処理結果
 */
export type DataInputResult = InputResultBase;

/**
 * データ出力
 */
export type DataOutputConfig = OutputConfigBase<typeof IO_TYPE.DATA>;

/**
 * データ出力時の処理結果
 */
export type DataOutputResult = OutputResultBase;
