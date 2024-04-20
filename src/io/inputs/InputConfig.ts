import { Content } from '../../types';
import { FsInputConfig } from './Fs';
import { NoopInputConfig } from './Noop';
import { InputConfigBase } from './types';

/**
 * 入力の設定
 */
type InputConfig = FsInputConfig | NoopInputConfig | InputConfigBase<Content>;

export default InputConfig;
