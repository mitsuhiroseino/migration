import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`WhiteThreshold`の設定
 */
export type WhiteThresholdConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.WHITE_THRESHOLD> & {
  red: number;
  green: number;
  blue: number;
  opacity?: number;
  intensity: number;
};
