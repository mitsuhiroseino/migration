import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`RemoveAlpha`の設定
 */
export type RemoveAlphaConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.REMOVE_ALPHA> & {};
