import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Swirl`の設定
 */
export type SwirlConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.SWIRL> & {
  degrees: number;
};
