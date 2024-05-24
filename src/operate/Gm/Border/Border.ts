import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { BorderConfig } from './types';

/**
 * 境界線
 *
 * 画像に境界線を追加することができる。境界線は、画像の周囲にフレームを付けるのに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-border
 *
 * @param state gmのインスタンス(ステート)
 * @param config Borderのコンフィグ
 * @returns gmのインスタンス
 */
const Border: GmManipulationFn<BorderConfig> = (state, config) => {
  const { width, height } = config;
  return state.border(width, height);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.BORDER, Border);
export default Border;
