import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`WhitePoint`の設定
 */
export type WhitePointConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.WHITE_POINT> & {
  x: number;
  y: number;
};
