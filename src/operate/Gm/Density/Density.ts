import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { DensityConfig } from './types';

/**
 * 解像度
 *
 * 画像の解像度や密度を設定することができる。印刷や表示における画像の品質を調整するのに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-density
 *
 * @param state gmのインスタンス(ステート)
 * @param config Densityのコンフィグ
 * @returns gmのインスタンス
 */
const Density: GmManipulation<DensityConfig> = (state, config) => {
  const { width, height } = config;
  return state.density(width, height);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.DENSITY, Density);
export default Density;
