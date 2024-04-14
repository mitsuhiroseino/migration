import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { UnsharpConfig } from './types';

/**
 * アンシャープ
 *
 * 画像にアンシャープマスクを適用することができる。画像の鮮明度を向上させるためのフィルタリングを行う。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-unsharp
 *
 * @param state gmのインスタンス(ステート)
 * @param config Unsharpのコンフィグ
 * @returns gmのインスタンス
 */
const Unsharp: GmManipulation<UnsharpConfig> = (state, config) => {
  const { radius, sigma, amount, threshold } = config;
  return state.unsharp(radius, sigma, amount, threshold);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.UNSHARP, Unsharp);
export default Unsharp;
