import { Content } from '../types';
import { AnyInputConfig } from './Any';
import { DataInputConfig } from './Data';
import { DbInputConfig } from './Db';
import { FsInputConfig } from './Fs';
import { HttpInputConfig } from './Http';
import { NoopInputConfig } from './Noop';
import { InputConfigBase } from './types';

/**
 * 入力の設定
 */
type InputConfig =
  | AnyInputConfig
  | DataInputConfig
  | DbInputConfig
  | FsInputConfig
  | HttpInputConfig
  | NoopInputConfig
  | InputConfigBase<Content>;

export default InputConfig;
