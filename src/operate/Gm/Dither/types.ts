import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Dither`の設定
 */
export type DitherConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.DITHER> & {
  enable?: boolean;
};
