import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { FuzzConfig } from './types';

/**
 * ぼかし
 *
 * 画像の色の許容範囲を指定することができる。指定した色と近い色を同一視することができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-fuzz
 *
 * @param state gmのインスタンス(ステート)
 * @param config Fuzzのコンフィグ
 * @returns gmのインスタンス
 */
const Fuzz: GmManipulationFn<FuzzConfig> = (state, config) => {
  const { distance, percent } = config;
  return state.fuzz(distance, percent);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.FUZZ, Fuzz);
export default Fuzz;
