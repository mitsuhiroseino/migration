import { Content } from '../../types';
import { BoilerplateInputConfig } from './Boilerplate';
import { FileInputConfig } from './File';
import { NoopInputConfig } from './Noop';
import { TemplateInputConfig } from './Template';
import { InputConfigBase } from './types';

/**
 * 入力の設定
 */
type InputConfig =
  | BoilerplateInputConfig
  | FileInputConfig
  | NoopInputConfig
  | TemplateInputConfig
  | InputConfigBase<Content>;

export default InputConfig;
