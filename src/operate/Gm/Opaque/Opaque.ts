import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { OpaqueConfig } from './types';

/**
 * 不透明
 *
 * 画像の透明部分を不透明にすることができる。透明な部分を指定された色やパターンで塗りつぶす。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-opaque
 *
 * @param state gmのインスタンス(ステート)
 * @param config Opaqueのコンフィグ
 * @returns gmのインスタンス
 */
const Opaque: GmManipulationFn<OpaqueConfig> = (state, config) => {
  const { color } = config;
  return state.opaque(color);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.OPAQUE, Opaque);
export default Opaque;
