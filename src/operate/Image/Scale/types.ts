import { ImageCallback } from '@jimp/core';
import { Scale } from '@jimp/plugin-scale';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { ImageManipulationConfigBase } from '../types';

/**
 * 画像操作`Scale`の設定
 */
export type ScaleConfig = ImageManipulationConfigBase<typeof IMAGE_MANIPULATION_TYPE.SCALE> & {
  fit?: boolean;
  factor?: number;
  width?: number;
  height?: number;
  mode?: string;
  callback?: ImageCallback<Scale>;
};
