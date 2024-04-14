import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Lower`の設定
 */
export type LowerConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.LOWER> & {
  width: number;
  height: number;
};
