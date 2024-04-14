import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { ThumbnailConfig } from './types';

/**
 * サムネイル
 *
 * 画像のサイズを素早く変更する。画質よりも速度を重視。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-thumbnail
 *
 * @param state gmのインスタンス(ステート)
 * @param config Thumbnailのコンフィグ
 * @returns gmのインスタンス
 */
const Thumbnail: GmManipulation<ThumbnailConfig> = (state, config) => {
  const { width, height, options } = config;
  return state.thumbnail(width, height, options);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.THUMBNAIL, Thumbnail);
export default Thumbnail;
