import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Gamma`の設定
 */
export type GammaConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.GAMMA> & {
  gamma?: number;
  gammaOut?: number;
};
