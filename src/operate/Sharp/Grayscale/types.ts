import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Grayscale`の設定
 */
export type GrayscaleConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.GRAYSCALE> & {
  grayscale?: boolean;
};
