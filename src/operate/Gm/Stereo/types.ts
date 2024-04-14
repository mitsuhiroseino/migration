import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Stereo`の設定
 */
export type StereoConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.STEREO> & {};
