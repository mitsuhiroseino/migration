import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Wave`の設定
 */
export type WaveConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.WAVE> & {
  amplitude: number;
  wavelength: number;
};
