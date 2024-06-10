import { IO_TYPE } from '../constants';
import { InputConfigBase, InputResultBase, InputReturnValue, OutputConfigBase, OutputResultBase } from '../types';

/**
 * データ入力
 */
export type DataInputConfig = InputConfigBase<typeof IO_TYPE.DATA> & {
  /**
   * 任意の入力結果
   */
  returnValues: InputReturnValue<any, DataInputResult> | InputReturnValue<any, DataInputResult>[];
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
