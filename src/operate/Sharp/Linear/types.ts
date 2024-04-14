import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Linear`の設定
 */
export type LinearConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.LINEAR> & {
  multiplier?: number | number[] | null;
  offset?: number | number[];
};
