import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { QualityConfig } from './types';

/**
 * 画像品質
 *
 * JPEG/MIFF/PNG/TIFFの圧縮レベル。圧縮率や品質レベルを調整することで、画像のファイルサイズと品質のバランスを調整する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-quality
 *
 * @param state gmのインスタンス(ステート)
 * @param config Qualityのコンフィグ
 * @returns gmのインスタンス
 */
const Quality: GmManipulationFn<QualityConfig> = (state, config) => {
  const { level } = config;
  return state.quality(level);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.QUALITY, Quality);
export default Quality;
