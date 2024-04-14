import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`ToColourspace`の設定
 */
export type ToColourspaceConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.TO_COLOURSPACE> & {
  colourspace?: string;
};
