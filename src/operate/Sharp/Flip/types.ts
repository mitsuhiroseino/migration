import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Flip`の設定
 */
export type FlipConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.FLIP> & {
  flip?: boolean;
};
