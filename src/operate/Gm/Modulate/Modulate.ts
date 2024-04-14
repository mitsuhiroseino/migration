import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { ModulateConfig } from './types';

/**
 * 明るさ、彩度、色相変更
 *
 * 画像の色相、彩度、明度を調整することができる。色のバランスや鮮やかさを調整するのに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-modulate
 *
 * @param state gmのインスタンス(ステート)
 * @param config Modulateのコンフィグ
 * @returns gmのインスタンス
 */
const Modulate: GmManipulation<ModulateConfig> = (state, config) => {
  const { b, s, h } = config;
  return state.modulate(b, s, h);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.MODULATE, Modulate);
export default Modulate;
