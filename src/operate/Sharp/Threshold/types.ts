import SharpLib from 'sharp';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Threshold`の設定
 */
export type ThresholdConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.THRESHOLD> & {
  threshold?: number;
} & SharpLib.ThresholdOptions;
