import { Content } from '../../types';
import { InputConfigBase } from '../types';
import { FsInputConfig } from './Fs';
import { NoopInputConfig } from './Noop';

/**
 * 入力の設定
 */
type InputConfig = FsInputConfig | NoopInputConfig | InputConfigBase<Content>;

export default InputConfig;
