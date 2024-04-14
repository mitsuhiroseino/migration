import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Median`の設定
 */
export type MedianConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.MEDIAN> & {
  size?: number;
};
