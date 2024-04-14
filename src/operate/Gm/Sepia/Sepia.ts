import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { SepiaConfig } from './types';

/**
 * セピア
 *
 * 画像にセピア調の効果を追加することができる。古めかしい雰囲気を持つセピア色に変換する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-sepia
 *
 * @param state gmのインスタンス(ステート)
 * @param config Sepiaのコンフィグ
 * @returns gmのインスタンス
 */
const Sepia: GmManipulation<SepiaConfig> = (state, config) => {
  const {} = config;
  return state.sepia();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.SEPIA, Sepia);
export default Sepia;
