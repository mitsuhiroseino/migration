import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Blur`の設定
 */
export type BlurConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.BLUR> & {
  radius: number;
  sigma?: number;
};
