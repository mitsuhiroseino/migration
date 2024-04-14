import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`GreenPrimary`の設定
 */
export type GreenPrimaryConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.GREEN_PRIMARY> & {
  x: number;
  y: number;
};
