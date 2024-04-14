import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { EdgeConfig } from './types';

/**
 * エッジ検出
 *
 * 画像のエッジを検出することができる。エッジ検出により、画像の輪郭を強調することができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-edge
 *
 * @param state gmのインスタンス(ステート)
 * @param config Edgeのコンフィグ
 * @returns gmのインスタンス
 */
const Edge: GmManipulation<EdgeConfig> = (state, config) => {
  const { radius } = config;
  return state.edge(radius);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.EDGE, Edge);
export default Edge;
