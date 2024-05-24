import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { ScaleConfig } from './types';

/**
 * スケール
 *
 * 画像のスケーリングを行うことができる。画像のサイズを指定した倍率で拡大縮小する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-scale
 *
 * @param state gmのインスタンス(ステート)
 * @param config Scaleのコンフィグ
 * @returns gmのインスタンス
 */
const Scale: GmManipulationFn<ScaleConfig> = (state, config) => {
  const { width, height } = config;
  return state.scale(width, height);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.SCALE, Scale);
export default Scale;
