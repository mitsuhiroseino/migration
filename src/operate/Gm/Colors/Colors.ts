import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { ColorsConfig } from './types';

/**
 * 色数変更
 *
 * 画像の色数を変更することができる。色数の変更により、画像の色の表現を調整することができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-colors
 *
 * @param state gmのインスタンス(ステート)
 * @param config Colorsのコンフィグ
 * @returns gmのインスタンス
 */
const Colors: GmManipulationFn<ColorsConfig> = (state, config) => {
  const { colors } = config;
  return state.colors(colors);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.COLORS, Colors);
export default Colors;
