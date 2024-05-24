import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { DitherConfig } from './types';

/**
 * 減色
 *
 * 画像の色を減色することができる。色数を減らすことで画像を効果的に圧縮するのに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-dither
 *
 * @param state gmのインスタンス(ステート)
 * @param config Ditherのコンフィグ
 * @returns gmのインスタンス
 */
const Dither: GmManipulationFn<DitherConfig> = (state, config) => {
  const { enable } = config;
  return state.dither(enable);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.DITHER, Dither);
export default Dither;
