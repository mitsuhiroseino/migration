import { IO_TYPE } from '../../constants';
import { CommonOutputResult } from '../../types';
import { OutputConfigBase } from '../types';

/**
 * 何もしない
 */
export type NoopOutputConfig = OutputConfigBase<typeof IO_TYPE.NOOP>;

/**
 * 何もしない処理結果
 */
export type NoopOutputResult = CommonOutputResult;
