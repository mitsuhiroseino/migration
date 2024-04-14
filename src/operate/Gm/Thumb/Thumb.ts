import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { ThumbConfig } from './types';

/**
 * サムネイル
 *
 * 画像のサイズを素早く変更する。画質よりも速度を重視。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-thumb
 *
 * @param state gmのインスタンス(ステート)
 * @param config Thumbのコンフィグ
 * @returns gmのインスタンス
 */
const Thumb: GmManipulation<ThumbConfig> = (state, config) => {
  const { width, height, outName, quality, align, callback } = config;
  return state.thumb(width, height, outName, quality, align, callback);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.THUMB, Thumb);
export default Thumb;
