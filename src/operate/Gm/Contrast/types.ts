import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Contrast`の設定
 */
export type ContrastConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.CONTRAST> & {
  multiplier: number;
};
