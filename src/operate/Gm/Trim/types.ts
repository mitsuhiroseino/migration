import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Trim`の設定
 */
export type TrimConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.TRIM> & {};
