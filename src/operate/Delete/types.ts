import { ReplaceConfig } from '../Replace';
import { OPERATION_TYPE } from '../constants';
import { OperationConfigBase } from '../types';

/**
 * 文字列削除の設定
 */
export type DeleteConfig = OperationConfigBase<typeof OPERATION_TYPE.DELETE> &
  Omit<ReplaceConfig, 'type' | 'replacement' | 'preserveReplacement'> & {};
