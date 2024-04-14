import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Extent`の設定
 */
export type ExtentConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.EXTENT> & {
  width: number;
  height: number;
  options?: string;
};
