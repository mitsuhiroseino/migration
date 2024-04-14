import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { SpreadConfig } from './types';

/**
 * 拡散
 *
 * 画像の色やパターンを拡散させることができる。色やパターンの広がりを調整する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-spread
 *
 * @param state gmのインスタンス(ステート)
 * @param config Spreadのコンフィグ
 * @returns gmのインスタンス
 */
const Spread: GmManipulation<SpreadConfig> = (state, config) => {
  const { amount } = config;
  return state.spread(amount);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.SPREAD, Spread);
export default Spread;
