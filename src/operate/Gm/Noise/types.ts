import { NoiseType } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Noise`の設定
 */
export type NoiseConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.NOISE> & {
  noiseType: NoiseType | string | number;
};
