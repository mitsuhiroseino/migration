import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Average`の設定
 */
export type AverageConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.AVERAGE> & {};
