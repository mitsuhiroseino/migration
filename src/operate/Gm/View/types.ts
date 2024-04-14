import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`View`の設定
 */
export type ViewConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.VIEW> & {};
