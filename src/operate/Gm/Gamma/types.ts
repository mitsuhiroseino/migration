import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Gamma`の設定
 */
export type GammaConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.GAMMA> & {
  r: number;
  g: number;
  b: number;
};
