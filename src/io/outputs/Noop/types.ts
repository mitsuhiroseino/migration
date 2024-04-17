import { CommonOutputResult } from '../../types';
import { OUTPUT_TYPE } from '../constants';
import { OutputConfigBase } from '../types';

/**
 * 何もしない
 */
export type NoopOutputConfig = OutputConfigBase<typeof OUTPUT_TYPE.NOOP>;

/**
 * 何もしない処理結果
 */
export type NoopOutputResult = CommonOutputResult;
