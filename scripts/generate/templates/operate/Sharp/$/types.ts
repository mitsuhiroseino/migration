import sharp from 'sharp';

import { IMAGE_MANIPULATION_TYPE } from '../constants';

/**
 * 画像操作`{{{uppercamelcase}}}`の設定
 */
export type {{{uppercamelcase}}}Config = {
  /**
   * 画像操作種別
   */
  type: typeof IMAGE_MANIPULATION_TYPE.{{{snakecase}}};
} & sharp.{{{uppercamelcase}}}Options;
