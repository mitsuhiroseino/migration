import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Modulate`の設定
 */
export type ModulateConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.MODULATE> & {
  brightness?: number | undefined;
  saturation?: number | undefined;
  hue?: number | undefined;
  lightness?: number | undefined;
};
