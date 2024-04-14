import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Lat`の設定
 */
export type LatConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.LAT> & {
  width: number;
  height: number;
  offset: number;
  percent?: boolean;
};
