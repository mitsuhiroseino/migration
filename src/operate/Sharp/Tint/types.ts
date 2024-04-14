import SharpLib from 'sharp';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Tint`の設定
 */
export type TintConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.TINT> & {
  tint: SharpLib.Color;
};
