import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { RaiseConfig } from './types';

/**
 * 浮き出し
 *
 * 画像の端を明るくしたり暗くしたりする。指定した方向や程度で、画像の輪郭を浮き出し状にする。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-raise
 *
 * @param state gmのインスタンス(ステート)
 * @param config Raiseのコンフィグ
 * @returns gmのインスタンス
 */
const Raise: GmManipulationFn<RaiseConfig> = (state, config) => {
  const { width, height } = config;
  return state.raise(width, height);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.RAISE, Raise);
export default Raise;
