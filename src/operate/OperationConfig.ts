import { AddConfig } from './Add';
import { BundleConfig } from './Bundle';
import { DeleteConfig } from './Delete';
import { EditConfig } from './Edit';
import { FillConfig } from './Fill';
import { FormatConfig } from './Format';
import { GenerateConfig } from './Generate';
import { ImageConfig } from './Image';
import { InputConfig } from './Input';
import { OutputConfig } from './Output';
import { ParamsConfig } from './Params';
import { ParseConfig } from './Parse';
import { ReplaceConfig } from './Replace';
import { StringifyConfig } from './Stringify';
import { UnbomConfig } from './Unbom';
import { OperationConfigBase } from './types';

/**
 * 操作の設定
 */
type OperationConfig =
  | AddConfig
  | BundleConfig
  | DeleteConfig
  | EditConfig
  | FillConfig
  | FormatConfig
  | GenerateConfig
  | ImageConfig
  | InputConfig
  | OutputConfig
  | ParamsConfig
  | ParseConfig
  | ReplaceConfig
  | StringifyConfig
  | UnbomConfig
  | OperationConfigBase<string>;

export default OperationConfig;
