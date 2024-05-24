import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { ConvolveConfig } from './types';

/**
 * 畳み込みフィルタ
 *
 * 画像に畳み込みフィルタを適用することができる。畳み込みフィルタを使用することで、画像の特徴を強調したり、ノイズを除去したりすることができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-convolve
 *
 * @param state gmのインスタンス(ステート)
 * @param config Convolveのコンフィグ
 * @returns gmのインスタンス
 */
const Convolve: GmManipulationFn<ConvolveConfig> = (state, config) => {
  const { kernel } = config;
  return state.convolve(kernel);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.CONVOLVE, Convolve);
export default Convolve;
