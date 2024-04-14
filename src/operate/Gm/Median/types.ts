import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Median`の設定
 */
export type MedianConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.MEDIAN> & {
  radius?: number;
};
