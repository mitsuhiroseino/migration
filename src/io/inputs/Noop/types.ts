import { IO_TYPE } from '../../constants';
import { InputConfigBase, InputResultBase } from '../../types';

/**
 * 何もしない
 */
export type NoopInputConfig = InputConfigBase<typeof IO_TYPE.NOOP>;

/**
 * 何もしない処理結果
 */
export type NoopInputResult = InputResultBase;
