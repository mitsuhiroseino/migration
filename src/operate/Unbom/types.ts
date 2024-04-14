import { OPERATION_TYPE } from '../constants';
import { OperationConfigBase } from '../types';

/**
 * BOM削除の設定
 */
export type UnbomConfig = OperationConfigBase<typeof OPERATION_TYPE.UNBOM>;
