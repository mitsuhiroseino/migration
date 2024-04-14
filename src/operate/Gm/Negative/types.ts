import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Negative`の設定
 */
export type NegativeConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.NEGATIVE> & {};
