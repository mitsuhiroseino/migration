import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { EncodingConfig } from './types';

/**
 * エンコーディング指定
 *
 * 画像のエンコード方法や形式を指定することができる。画像のファイル形式や圧縮方法を設定するのに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-encoding
 *
 * @param state gmのインスタンス(ステート)
 * @param config Encodingのコンフィグ
 * @returns gmのインスタンス
 */
const Encoding: GmManipulationFn<EncodingConfig> = (state, config) => {
  const { encoding } = config;
  return state.encoding(encoding);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.ENCODING, Encoding);
export default Encoding;
