import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Border`の設定
 */
export type BorderConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.BORDER> & {
  width: number;
  height: number;
};
