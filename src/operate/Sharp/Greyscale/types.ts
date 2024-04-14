import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Greyscale`の設定
 */
export type GreyscaleConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.GREYSCALE> & {
  greyscale?: boolean;
};
