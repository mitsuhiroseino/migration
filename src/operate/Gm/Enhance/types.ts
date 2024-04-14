import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Enhance`の設定
 */
export type EnhanceConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.ENHANCE> & {};
