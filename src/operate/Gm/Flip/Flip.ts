import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { FlipConfig } from './types';

/**
 * 上下反転
 *
 * 画像を上下に反転させることができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-flip
 *
 * @param state gmのインスタンス(ステート)
 * @param config Flipのコンフィグ
 * @returns gmのインスタンス
 */
const Flip: GmManipulationFn<FlipConfig> = (state, config) => {
  const {} = config;
  return state.flip();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.FLIP, Flip);
export default Flip;
