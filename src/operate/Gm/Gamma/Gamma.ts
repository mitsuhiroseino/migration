import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { GammaConfig } from './types';

/**
 * ガンマ補正
 *
 * 画像のガンマ補正を行うことができる。画像の明るさやコントラストを調整するのに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-gamma
 *
 * @param state gmのインスタンス(ステート)
 * @param config Gammaのコンフィグ
 * @returns gmのインスタンス
 */
const Gamma: GmManipulation<GammaConfig> = (state, config) => {
  const { r, g, b } = config;
  return state.gamma(r, g, b);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.GAMMA, Gamma);
export default Gamma;
