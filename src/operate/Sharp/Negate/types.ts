import SharpLib from 'sharp';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Negate`の設定
 */
export type NegateConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.NEGATE> & {
  negate?: boolean;
} & SharpLib.NegateOptions;
