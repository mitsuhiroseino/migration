import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { NegativeConfig } from './types';

/**
 * 色の反転
 *
 * すべてのピクセルをその補色で置き換える。色の反転を行い、画像の色を反転させる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-negative
 *
 * @param state gmのインスタンス(ステート)
 * @param config Negativeのコンフィグ
 * @returns gmのインスタンス
 */
const Negative: GmManipulation<NegativeConfig> = (state, config) => {
  const {} = config;
  return state.negative();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.NEGATIVE, Negative);
export default Negative;
