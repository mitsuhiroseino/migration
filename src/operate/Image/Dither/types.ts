import { ImageCallback } from '@jimp/core';
import { Dither } from '@jimp/plugin-dither';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { ImageManipulationConfigBase } from '../types';

/**
 * 画像操作`Dither`の設定
 */
export type DitherConfig = ImageManipulationConfigBase<typeof IMAGE_MANIPULATION_TYPE.DITHER> & {
  callback?: ImageCallback<Dither>;
};
