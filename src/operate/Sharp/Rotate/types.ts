import SharpLib from 'sharp';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Rotate`の設定
 */
export type RotateConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.ROTATE> & {
  angle?: number;
} & SharpLib.RotateOptions;
