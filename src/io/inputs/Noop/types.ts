import { IO_TYPE } from '../../constants';
import { CommonInputResult } from '../../types';
import { InputConfigBase } from '../types';

/**
 * 何もしない
 */
export type NoopInputConfig = InputConfigBase<typeof IO_TYPE.NOOP>;

/**
 * 何もしない処理結果
 */
export type NoopInputResult = CommonInputResult;
