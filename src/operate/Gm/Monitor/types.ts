import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Monitor`の設定
 */
export type MonitorConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.MONITOR> & {};
