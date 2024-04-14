import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`NoProfile`の設定
 */
export type NoProfileConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.NO_PROFILE> & {};
