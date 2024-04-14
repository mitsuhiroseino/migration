import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Transparent`の設定
 */
export type TransparentConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.TRANSPARENT> & {
  color: string;
};
