import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { VirtualPixelConfig } from './types';

/**
 * 仮想ピクセル
 *
 * 仮想ピクセルの設定を行うことができる。画像の範囲外のピクセルをどのように扱うかを指定する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-virtualPixel
 *
 * @param state gmのインスタンス(ステート)
 * @param config VirtualPixelのコンフィグ
 * @returns gmのインスタンス
 */
const VirtualPixel: GmManipulation<VirtualPixelConfig> = (state, config) => {
  const { method } = config;
  return state.virtualPixel(method);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.VIRTUAL_PIXEL, VirtualPixel);
export default VirtualPixel;
