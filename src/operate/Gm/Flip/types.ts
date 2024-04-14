import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Flip`の設定
 */
export type FlipConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.FLIP> & {};
