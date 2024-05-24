import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { UsePixmapConfig } from './types';

/**
 * ピクスマップの使用
 *
 * 画像の表示にピクスマップを使用するかどうかを設定することができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-usePixmap
 *
 * @param state gmのインスタンス(ステート)
 * @param config UsePixmapのコンフィグ
 * @returns gmのインスタンス
 */
const UsePixmap: GmManipulationFn<UsePixmapConfig> = (state, config) => {
  const {} = config;
  return state.usePixmap();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.USE_PIXMAP, UsePixmap);
export default UsePixmap;
