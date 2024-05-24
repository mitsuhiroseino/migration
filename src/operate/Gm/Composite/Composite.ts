import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { CompositeConfig } from './types';

/**
 * 合成
 *
 * 画像を合成することができる。複数の画像を組み合わせて1枚の画像を作成する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-composite
 *
 * @param state gmのインスタンス(ステート)
 * @param config Compositeのコンフィグ
 * @returns gmのインスタンス
 */
const Composite: GmManipulationFn<CompositeConfig> = (state, config) => {
  const { changeImagePath, maskImagePath } = config;
  return state.composite(changeImagePath, maskImagePath);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.COMPOSITE, Composite);
export default Composite;
