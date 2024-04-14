import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Shade`の設定
 */
export type ShadeConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.SHADE> & {
  azimuth: number;
  elevation: number;
};
