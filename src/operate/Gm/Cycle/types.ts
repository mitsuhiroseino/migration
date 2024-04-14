import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Cycle`の設定
 */
export type CycleConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.CYCLE> & {
  amount: number;
};
