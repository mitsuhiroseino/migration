import { AddConfig } from './Add';
import { BundleConfig } from './Bundle';
import { DeleteConfig } from './Delete';
import { EditConfig } from './Edit';
import { FillConfig } from './Fill';
import { FormatConfig } from './Format';
import { GenerateConfig } from './Generate';
import { IfConfig } from './If';
import { ImageConfig } from './Image';
import { ParamsConfig } from './Params';
import { ParseConfig } from './Parse';
import { ReadConfig } from './Read';
import { ReplaceConfig } from './Replace';
import { StringifyConfig } from './Stringify';
import { UnbomConfig } from './Unbom';
import { WhileConfig } from './While';
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
  | IfConfig
  | ImageConfig
  | ParamsConfig
  | ParseConfig
  | ReadConfig
  | ReplaceConfig
  | StringifyConfig
  | UnbomConfig
  | WhileConfig
  | WriteConfig
  | OperationConfigBase<string>;

export default OperationConfig;
