import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Fuzz`の設定
 */
export type FuzzConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.FUZZ> & {
  distance: number;
  percent?: boolean;
};
