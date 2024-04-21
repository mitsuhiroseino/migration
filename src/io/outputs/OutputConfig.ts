import { Content } from '../../types';
import { OutputConfigBase } from '../types';
import { FsOutputConfig } from './Fs';

/**
 * 出力の設定
 */
type OutputConfig = FsOutputConfig | OutputConfigBase<Content>;

export default OutputConfig;
