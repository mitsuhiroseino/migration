import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Shadow`の設定
 */
export type ShadowConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.SHADOW> & {
  radius: number;
  sigma?: number;
};
