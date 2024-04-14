import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`EnsureAlpha`の設定
 */
export type EnsureAlphaConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.ENSURE_ALPHA> & {
  alpha?: number;
};
