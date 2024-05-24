import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { MinifyConfig } from './types';

/**
 * 縮小
 *
 * 画像を縮小することができる。画像のサイズを縮小して、ファイルサイズを減らすことができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-minify
 *
 * @param state gmのインスタンス(ステート)
 * @param config Minifyのコンフィグ
 * @returns gmのインスタンス
 */
const Minify: GmManipulationFn<MinifyConfig> = (state, config) => {
  const { factor } = config;
  return state.minify(factor);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.MINIFY, Minify);
export default Minify;
