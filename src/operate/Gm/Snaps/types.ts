import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Snaps`の設定
 */
export type SnapsConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.SNAPS> & {
  count: number;
};
