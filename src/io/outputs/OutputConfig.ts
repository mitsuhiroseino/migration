import { Content } from '../../types';
import { FileOutputConfig } from './File';
import { OutputConfigBase } from './types';

/**
 * 出力の設定
 */
type OutputConfig = FileOutputConfig | OutputConfigBase<Content>;

export default OutputConfig;
