import { IO_TYPE } from '../../constants';
import { OutputConfigBase, OutputResultBase } from '../../types';

/**
 * データ出力
 */
export type DataOutputConfig = OutputConfigBase<typeof IO_TYPE.DATA>;

/**
 * データ出力時の処理結果
 */
export type DataOutputResult = OutputResultBase;
