import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Mask`の設定
 */
export type MaskConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.MASK> & {
  filename: string;
};
