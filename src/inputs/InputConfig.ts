import { Content } from '../types';
import { FileInputConfig } from './File';
import { InputConfigBase } from './types';

/**
 * 入力の設定
 */
type InputConfig = FileInputConfig | InputConfigBase<Content>;

export default InputConfig;
