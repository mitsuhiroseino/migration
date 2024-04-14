import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { RepageConfig } from './types';

/**
 * ページ再設定
 *
 * 画像のページ設定を調整することができる。画像のページ位置やサイズを調整する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-repage
 *
 * @param state gmのインスタンス(ステート)
 * @param config Repageのコンフィグ
 * @returns gmのインスタンス
 */
const Repage: GmManipulation<RepageConfig> = (state, config) => {
  const { width, height, xoff, yoff, arg, reset } = config;
  if (reset == null) {
    return state.repage(width, height, xoff, yoff, arg);
  } else {
    return state.repage(reset);
  }
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.REPAGE, Repage);
export default Repage;
