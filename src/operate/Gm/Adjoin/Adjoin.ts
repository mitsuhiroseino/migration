import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { AdjoinConfig } from './types';

/**
 * 画像の結合
 *
 * 複数の画像を一つの画像に結合することができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-adjoin
 *
 * @param state gmのインスタンス(ステート)
 * @param config Adjoinのコンフィグ
 * @returns gmのインスタンス
 */
const Adjoin: GmManipulationFn<AdjoinConfig> = (state, config) => {
  const {} = config;
  return state.adjoin();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.ADJOIN, Adjoin);
export default Adjoin;
