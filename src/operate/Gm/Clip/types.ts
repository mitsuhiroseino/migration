import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Clip`の設定
 */
export type ClipConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.CLIP> & {};
