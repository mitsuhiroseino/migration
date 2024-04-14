import SharpLib from 'sharp';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Sharpen`の設定
 */
export type SharpenConfig = SharpManipulationConfigBase<
  typeof SHARP_MANIPULATION_TYPE.SHARPEN
> & {} & SharpLib.SharpenOptions;
