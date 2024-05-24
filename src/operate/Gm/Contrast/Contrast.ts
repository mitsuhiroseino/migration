import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { ContrastConfig } from './types';

/**
 * コントラスト調整
 *
 * 画像のコントラストを調整することができる。コントラストの調整により、画像の明るさと暗さの差を強調することができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-contrast
 *
 * @param state gmのインスタンス(ステート)
 * @param config Contrastのコンフィグ
 * @returns gmのインスタンス
 */
const Contrast: GmManipulationFn<ContrastConfig> = (state, config) => {
  const { multiplier } = config;
  return state.contrast(multiplier);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.CONTRAST, Contrast);
export default Contrast;
