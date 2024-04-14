import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Loop`の設定
 */
export type LoopConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.LOOP> & {
  iterations: number;
};
