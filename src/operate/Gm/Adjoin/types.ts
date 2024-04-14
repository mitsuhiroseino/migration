import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Adjoin`の設定
 */
export type AdjoinConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.ADJOIN> & {};
