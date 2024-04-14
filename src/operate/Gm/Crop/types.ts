import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Crop`の設定
 */
export type CropConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.CROP> & {
  width: number;
  height: number;
  x?: number;
  y?: number;
  percent?: boolean;
};
