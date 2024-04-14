import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Backdrop`の設定
 */
export type BackdropConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.BACKDROP> & {};
