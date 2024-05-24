import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { FlattenConfig } from './types';

/**
 * レイヤー統合
 *
 * 画像のレイヤーを平坦化することができる。複数の画像レイヤーを一つの画像に結合する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-flatten
 *
 * @param state gmのインスタンス(ステート)
 * @param config Flattenのコンフィグ
 * @returns gmのインスタンス
 */
const Flatten: GmManipulationFn<FlattenConfig> = (state, config) => {
  const {} = config;
  return state.flatten();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.FLATTEN, Flatten);
export default Flatten;
