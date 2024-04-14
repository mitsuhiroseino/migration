import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Flop`の設定
 */
export type FlopConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.FLOP> & {
  flop?: boolean;
};
