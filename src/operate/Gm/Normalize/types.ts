import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Normalize`の設定
 */
export type NormalizeConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.NORMALIZE> & {};
