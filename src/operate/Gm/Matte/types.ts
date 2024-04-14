import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Matte`の設定
 */
export type MatteConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.MATTE> & {};
