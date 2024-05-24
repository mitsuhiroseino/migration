import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { ExtentConfig } from './types';

/**
 * サイズ変更
 *
 * 画像のサイズを変更することができる。指定されたサイズにリサイズするか、余白を追加してサイズを変更する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-extent
 *
 * @param state gmのインスタンス(ステート)
 * @param config Extentのコンフィグ
 * @returns gmのインスタンス
 */
const Extent: GmManipulationFn<ExtentConfig> = (state, config) => {
  const { width, height, options } = config;
  return state.extent(width, height, options);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.EXTENT, Extent);
export default Extent;
