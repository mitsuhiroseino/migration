import { ImageCallback } from '@jimp/core';
import { Blur } from '@jimp/plugin-blur';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { ImageManipulationConfigBase } from '../types';

/**
 * 画像操作`Blur`の設定
 */
export type BlurConfig = ImageManipulationConfigBase<typeof IMAGE_MANIPULATION_TYPE.BLUR> & {
  radius: number;
  callback?: ImageCallback<Blur>;
};
