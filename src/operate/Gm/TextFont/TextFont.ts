import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { TextFontConfig } from './types';

/**
 * テキストフォント指定
 *
 * 画像にテキストを追加する際のフォントを指定することができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-textFont
 *
 * @param state gmのインスタンス(ステート)
 * @param config TextFontのコンフィグ
 * @returns gmのインスタンス
 */
const TextFont: GmManipulation<TextFontConfig> = (state, config) => {
  const { font } = config;
  return state.textFont(font);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.TEXT_FONT, TextFont);
export default TextFont;
