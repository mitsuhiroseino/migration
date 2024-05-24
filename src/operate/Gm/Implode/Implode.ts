import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { ImplodeConfig } from './types';

/**
 * 内側に収縮
 *
 * 画像を内側に収縮させることができる。画像を中心点を基準に収縮することで、効果的な視覚的効果を得ることができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-implode
 *
 * @param state gmのインスタンス(ステート)
 * @param config Implodeのコンフィグ
 * @returns gmのインスタンス
 */
const Implode: GmManipulationFn<ImplodeConfig> = (state, config) => {
  const { factor } = config;
  return state.implode(factor);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.IMPLODE, Implode);
export default Implode;
