import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Equalize`の設定
 */
export type EqualizeConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.EQUALIZE> & {};
