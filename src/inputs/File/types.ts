import { VariableString } from '../../types';
import { INPUT_TYPE } from '../constants';
import { InputConfigBase } from '../types';

export type FileInputConfig = InputConfigBase<typeof INPUT_TYPE.FILE> & {
  targetPath: VariableString;
};
