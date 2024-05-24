import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { MorphConfig } from './types';

/**
 * モーフィング
 *
 * 画像間のモーフィングを行うことができる。複数の画像間で形状や特徴を変化させるのに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-morph
 *
 * @param state gmのインスタンス(ステート)
 * @param config Morphのコンフィグ
 * @returns gmのインスタンス
 */
const Morph: GmManipulationFn<MorphConfig> = (state, config) => {
  const { otherImg, outName, callback } = config;
  return state.morph(otherImg, outName, callback);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.MORPH, Morph);
export default Morph;
