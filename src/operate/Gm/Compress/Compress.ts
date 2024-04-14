import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { CompressConfig } from './types';

/**
 * 圧縮
 *
 * 画像を圧縮することができる。圧縮率や圧縮形式を指定して、画像ファイルのサイズを減らすことができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-compress
 *
 * @param state gmのインスタンス(ステート)
 * @param config Compressのコンフィグ
 * @returns gmのインスタンス
 */
const Compress: GmManipulation<CompressConfig> = (state, config) => {
  const { compressionType } = config;
  return state.compress(compressionType);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.COMPRESS, Compress);
export default Compress;
