import { Condition } from '../../utils/isMatch';
import OperationBase from '../OperationBase';
import { OPERATION_TYPE } from '../constants';
import { OperationConfigBase } from '../types';

/**
 * 条件分岐の設定
 */
export type IfConfig = OperationConfigBase<typeof OPERATION_TYPE.IF> & {
  /**
   * 条件
   */
  condition: Condition;

  /**
   * 条件に合致したときの処理
   */
  then?: (OperationConfigBase | OperationBase)[];

  /**
   * 条件に合致しなかったときの処理
   */
  else?: (OperationConfigBase | OperationBase)[];
};
