import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`BlackThreshold`の設定
 */
export type BlackThresholdConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.BLACK_THRESHOLD> & {
  intensity: number;
  red: number;
  green: number;
  blue: number;
  opacity?: number;
};
