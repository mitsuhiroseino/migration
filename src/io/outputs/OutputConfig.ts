import { Content } from '../../types';
import { FsOutputConfig } from './Fs';
import { OutputConfigBase } from './types';

/**
 * 出力の設定
 */
type OutputConfig = FsOutputConfig | OutputConfigBase<Content>;

export default OutputConfig;
