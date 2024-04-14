import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Blur`の設定
 */
export type BlurConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.BLUR> & {
  sigma?: number | boolean;
};
