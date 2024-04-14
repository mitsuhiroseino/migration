import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`ToColorspace`の設定
 */
export type ToColorspaceConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.TO_COLORSPACE> & {
  colorspace: string;
};
