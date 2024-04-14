import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { TransparentConfig } from './types';

/**
 * 透明化
 *
 * 指定した色を透明化し、画像の一部を透明にする。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-transparent
 *
 * @param state gmのインスタンス(ステート)
 * @param config Transparentのコンフィグ
 * @returns gmのインスタンス
 */
const Transparent: GmManipulation<TransparentConfig> = (state, config) => {
  const { color } = config;
  return state.transparent(color);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.TRANSPARENT, Transparent);
export default Transparent;
