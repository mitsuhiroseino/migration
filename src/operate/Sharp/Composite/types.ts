import SharpLib from 'sharp';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Composite`の設定
 */
export type CompositeConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.COMPOSITE> & {
  images: SharpLib.OverlayOptions[];
};
