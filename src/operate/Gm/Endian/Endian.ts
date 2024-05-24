import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { EndianConfig } from './types';

/**
 * エンディアン
 *
 * 画像のバイトオーダーを設定することができる。エンディアンの変更により、画像の解釈や表示が変わることがある。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-endian
 *
 * @param state gmのインスタンス(ステート)
 * @param config Endianのコンフィグ
 * @returns gmのインスタンス
 */
const Endian: GmManipulationFn<EndianConfig> = (state, config) => {
  const { endianType } = config;
  return state.endian(endianType);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.ENDIAN, Endian);
export default Endian;
