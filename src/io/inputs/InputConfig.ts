import { Content } from '../../types';
import { FileInputConfig } from './File';
import { NoopInputConfig } from './Noop';
import { InputConfigBase } from './types';

/**
 * 入力の設定
 */
type InputConfig = FileInputConfig | NoopInputConfig | InputConfigBase<Content>;

export default InputConfig;
