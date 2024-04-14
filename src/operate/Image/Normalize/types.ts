import { ImageCallback } from '@jimp/core';
import { Normalize } from '@jimp/plugin-normalize';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { ImageManipulationConfigBase } from '../types';

/**
 * 画像操作`Normalize`の設定
 */
export type NormalizeConfig = ImageManipulationConfigBase<typeof IMAGE_MANIPULATION_TYPE.NORMALIZE> & {
  callback?: ImageCallback<Normalize>;
};
