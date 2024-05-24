import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { MedianConfig } from './types';

/**
 * メディアンフィルター
 *
 * 画像のメディアンフィルターを適用することができる。メディアンフィルターは、画像のノイズを除去するのに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-median
 *
 * @param state gmのインスタンス(ステート)
 * @param config Medianのコンフィグ
 * @returns gmのインスタンス
 */
const Median: GmManipulationFn<MedianConfig> = (state, config) => {
  const { radius } = config;
  return state.median(radius);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.MEDIAN, Median);
export default Median;
