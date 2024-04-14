import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { BoxConfig } from './types';

/**
 * ボックスフィルタ
 *
 * 画像にボックスフィルタを適用することができる。ボックスフィルタは、画像をぼかすのに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-box
 *
 * @param state gmのインスタンス(ステート)
 * @param config Boxのコンフィグ
 * @returns gmのインスタンス
 */
const Box: GmManipulation<BoxConfig> = (state, config) => {
  const { color } = config;
  return state.box(color);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.BOX, Box);
export default Box;
