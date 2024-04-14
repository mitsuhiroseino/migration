import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`BluePrimary`の設定
 */
export type BluePrimaryConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.BLUE_PRIMARY> & {
  x: number;
  y: number;
};
