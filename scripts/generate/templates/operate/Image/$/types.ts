import { ImageCallback } from '@jimp/core';
import { {{{uppercamelcase}}} } from '@jimp/plugin-{{{lowercamelcase}}}';
import { IMAGE_MANIPULATION_TYPE } from '../constants';

/**
 * 画像操作`{{{uppercamelcase}}}`の設定
 */
export type {{{uppercamelcase}}}Config = {
  /**
   * 画像操作種別
   */
  type: typeof IMAGE_MANIPULATION_TYPE.{{{snakecase}}};

  callback?: ImageCallback<{{{uppercamelcase}}}>;
};
