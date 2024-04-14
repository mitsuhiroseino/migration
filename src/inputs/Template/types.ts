import { VariableString } from '../../types';
import { INPUT_TYPE } from '../constants';
import { InputConfigBase } from '../types';

export type TemplateInputConfig = InputConfigBase<typeof INPUT_TYPE.TEMPLATE> & {
  targetPath: VariableString;
};
