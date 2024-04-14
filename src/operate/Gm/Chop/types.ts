import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Chop`の設定
 */
export type ChopConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.CHOP> & {
  width: number;
  height: number;
  x?: number;
  y?: number;
};
