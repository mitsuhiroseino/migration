import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { CharcoalConfig } from './types';

/**
 * 木炭効果
 *
 * 画像に木炭効果を適用することができる。木炭効果は、画像に粗い質感を与えるのに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-charcoal
 *
 * @param state gmのインスタンス(ステート)
 * @param config Charcoalのコンフィグ
 * @returns gmのインスタンス
 */
const Charcoal: GmManipulationFn<CharcoalConfig> = (state, config) => {
  const { factor } = config;
  return state.charcoal(factor);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.CHARCOAL, Charcoal);
export default Charcoal;
