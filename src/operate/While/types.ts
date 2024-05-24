import { Condition } from '../../utils/isMatch';
import { OPERATION_TYPE } from '../constants';
import { OperationBundlerConfig, OperationConfigBase } from '../types';

/**
 * 繰り返しの設定
 */
export type WhileConfig = OperationConfigBase<typeof OPERATION_TYPE.WHILE> &
  OperationBundlerConfig & {
    /**
     * 繰り返し条件
     */
    condition: Condition;
  };
