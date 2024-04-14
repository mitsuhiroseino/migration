import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Box`の設定
 */
export type BoxConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.BOX> & {
  color: string;
};
