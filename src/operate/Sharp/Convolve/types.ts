import SharpLib from 'sharp';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Convolve`の設定
 */
export type ConvolveConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.CONVOLVE> & {
  kernel: SharpLib.Kernel;
};
