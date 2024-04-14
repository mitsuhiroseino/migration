import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Scale`の設定
 */
export type ScaleConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.SCALE> & {
  width: number;
  height: number;
};
