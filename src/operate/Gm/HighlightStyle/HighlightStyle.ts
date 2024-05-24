import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { HighlightStyleConfig } from './types';

/**
 * ハイライトのスタイル
 *
 * 画像のハイライトのスタイルを指定することができる。ハイライトのスタイルや効果を変更するのに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-highlightStyle
 *
 * @param state gmのインスタンス(ステート)
 * @param config HighlightStyleのコンフィグ
 * @returns gmのインスタンス
 */
const HighlightStyle: GmManipulationFn<HighlightStyleConfig> = (state, config) => {
  const { style } = config;
  return state.highlightStyle(style);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.HIGHLIGHT_STYLE, HighlightStyle);
export default HighlightStyle;
