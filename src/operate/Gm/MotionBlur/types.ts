import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`MotionBlur`の設定
 */
export type MotionBlurConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.MOTION_BLUR> & {
  radius: number;
  sigma?: number;
  angle?: number;
};
