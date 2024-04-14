import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Silent`の設定
 */
export type SilentConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.SILENT> & {};
