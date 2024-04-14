import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { HighlightColorConfig } from './types';

/**
 * ハイライトの色
 *
 * 画像のハイライト色を指定することができる。ハイライトの色や強度を調整するのに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-highlightColor
 *
 * @param state gmのインスタンス(ステート)
 * @param config HighlightColorのコンフィグ
 * @returns gmのインスタンス
 */
const HighlightColor: GmManipulation<HighlightColorConfig> = (state, config) => {
  const { color } = config;
  return state.highlightColor(color);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.HIGHLIGHT_COLOR, HighlightColor);
export default HighlightColor;
