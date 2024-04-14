import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`RedPrimary`の設定
 */
export type RedPrimaryConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.RED_PRIMARY> & {
  x: number;
  y: number;
};
