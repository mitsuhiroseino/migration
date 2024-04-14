import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Strip`の設定
 */
export type StripConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.STRIP> & {};
