import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Roll`の設定
 */
export type RollConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.ROLL> & {
  horizontal: number;
  vertical: number;
};
