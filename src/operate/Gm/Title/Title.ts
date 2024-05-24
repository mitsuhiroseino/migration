import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { TitleConfig } from './types';

/**
 * タイトル
 *
 * タイトルを設定することができる。画像や動画にタイトルを追加する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-title
 *
 * @param state gmのインスタンス(ステート)
 * @param config Titleのコンフィグ
 * @returns gmのインスタンス
 */
const Title: GmManipulationFn<TitleConfig> = (state, config) => {
  const { title } = config;
  return state.title(title);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.TITLE, Title);
export default Title;
