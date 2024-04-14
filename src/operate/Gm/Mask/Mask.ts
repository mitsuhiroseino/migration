import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { MaskConfig } from './types';

/**
 * マスク
 *
 * 画像にマスクを適用することができる。指定されたマスクに基づいて、画像の一部を表示または非表示にする。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-mask
 *
 * @param state gmのインスタンス(ステート)
 * @param config Maskのコンフィグ
 * @returns gmのインスタンス
 */
const Mask: GmManipulation<MaskConfig> = (state, config) => {
  const { filename } = config;
  return state.mask(filename);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.MASK, Mask);
export default Mask;
