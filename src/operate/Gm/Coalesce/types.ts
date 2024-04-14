import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Coalesce`の設定
 */
export type CoalesceConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.COALESCE> & {};
