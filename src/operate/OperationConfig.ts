import { AddConfig } from './Add';
import { BundleConfig } from './Bundle';
import { DeleteConfig } from './Delete';
import { EditConfig } from './Edit';
import { FillConfig } from './Fill';
import { FormatConfig } from './Format';
import { GenerateConfig } from './Generate';
import { ImageConfig } from './Image';
import { ParamsConfig } from './Params';
import { ParseConfig } from './Parse';
import { ReadConfig } from './Read';
import { ReplaceConfig } from './Replace';
import { StringifyConfig } from './Stringify';
import { UnbomConfig } from './Unbom';
import { WriteConfig } from './Write';
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
  | ReadConfig
  | WriteConfig
  | ParamsConfig
  | ParseConfig
  | ReplaceConfig
  | StringifyConfig
  | UnbomConfig
  | OperationConfigBase<string>;

export default OperationConfig;
