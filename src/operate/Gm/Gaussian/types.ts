import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Gaussian`の設定
 */
export type GaussianConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.GAUSSIAN> & {
  radius: number;
  sigma?: number;
};
