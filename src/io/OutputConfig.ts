import { Content } from '../types';
import { AnyOutputConfig } from './Any';
import { DataOutputConfig } from './Data';
import { DbOutputConfig } from './Db';
import { FsOutputConfig } from './Fs';
import { HttpOutputConfig } from './Http';
import { NoopOutputConfig } from './Noop';
import { OutputConfigBase } from './types';

/**
 * 出力の設定
 */
type OutputConfig =
  | AnyOutputConfig
  | DataOutputConfig
  | DbOutputConfig
  | FsOutputConfig
  | HttpOutputConfig
  | NoopOutputConfig
  | OutputConfigBase<Content>;

export default OutputConfig;
