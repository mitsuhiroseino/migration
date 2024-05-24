import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { FilterConfig } from './types';

/**
 * フィルタ
 *
 * 画像にフィルター処理を適用することができる。ぼかし、シャープ化、輪郭強調などのさまざまなエフェクトを実現することができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-filter
 *
 * @param state gmのインスタンス(ステート)
 * @param config Filterのコンフィグ
 * @returns gmのインスタンス
 */
const Filter: GmManipulationFn<FilterConfig> = (state, config) => {
  const { filterType } = config;
  return state.filter(filterType);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.FILTER, Filter);
export default Filter;
