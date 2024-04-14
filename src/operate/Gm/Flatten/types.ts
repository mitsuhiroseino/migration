import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Flatten`の設定
 */
export type FlattenConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.FLATTEN> & {};
