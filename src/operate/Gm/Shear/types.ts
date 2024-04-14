import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Shear`の設定
 */
export type ShearConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.SHEAR> & {
  xDegrees: number;
  yDegress: number;
};
