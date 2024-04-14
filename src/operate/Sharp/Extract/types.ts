import SharpLib from 'sharp';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Extract`の設定
 */
export type ExtractConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.EXTRACT> & {
  region: SharpLib.Region;
};
