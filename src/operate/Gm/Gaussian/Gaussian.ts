import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { GaussianConfig } from './types';

/**
 * ガウシアンぼかし
 *
 * 画像にガウシアンぼかしを適用することができる。ガウシアンぼかしは、画像のエッジを滑らかにするのに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-gaussian
 *
 * @param state gmのインスタンス(ステート)
 * @param config Gaussianのコンフィグ
 * @returns gmのインスタンス
 */
const Gaussian: GmManipulationFn<GaussianConfig> = (state, config) => {
  const { radius, sigma } = config;
  return state.gaussian(radius, sigma);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.GAUSSIAN, Gaussian);
export default Gaussian;
