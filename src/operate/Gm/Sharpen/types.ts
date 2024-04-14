import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Sharpen`の設定
 */
export type SharpenConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.SHARPEN> & {
  radius: number;
  sigma?: number;
};
