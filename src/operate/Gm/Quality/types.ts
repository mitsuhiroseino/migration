import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Quality`の設定
 */
export type QualityConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.QUALITY> & {
  level: number;
};
