import { ImageCallback } from '@jimp/core';
import { ResizeClass } from '@jimp/plugin-resize';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { ImageManipulationConfigBase } from '../types';

/**
 * 画像操作`Resize`の設定
 */
export type ResizeConfig = ImageManipulationConfigBase<typeof IMAGE_MANIPULATION_TYPE.RESIZE> & {
  width: number;
  height: number;
  mode?: string;
  callback?: ImageCallback<ResizeClass>;
};
