import { CommonInputResult } from '../../types';
import { INPUT_TYPE } from '../constants';
import { InputConfigBase } from '../types';

/**
 * 何もしない
 */
export type NoopInputConfig = InputConfigBase<typeof INPUT_TYPE.NOOP>;

/**
 * 何もしない処理結果
 */
export type NoopInputResult = CommonInputResult;
