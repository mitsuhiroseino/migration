import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { FlopConfig } from './types';

/**
 * 左右反転
 *
 * 画像を左右に反転させることができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-flop
 *
 * @param state gmのインスタンス(ステート)
 * @param config Flopのコンフィグ
 * @returns gmのインスタンス
 */
const Flop: GmManipulation<FlopConfig> = (state, config) => {
  const {} = config;
  return state.flop();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.FLOP, Flop);
export default Flop;
