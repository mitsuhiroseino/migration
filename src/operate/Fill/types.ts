import { ReplacePlaceholdersOptions } from '../../utils/replacePlaceholders';
import { OPERATION_TYPE } from '../constants';
import { OperationConfigBase } from '../types';

/**
 * 値の埋め込み関数の設定
 */
export type FillConfig = OperationConfigBase<typeof OPERATION_TYPE.FILL> & ReplacePlaceholdersOptions & {};
