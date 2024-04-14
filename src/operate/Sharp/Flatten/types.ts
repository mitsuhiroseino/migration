import SharpLib from 'sharp';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Flatten`の設定
 */
export type FlattenConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.FLATTEN> & {
  flatten?: boolean;
} & SharpLib.FlattenOptions;
