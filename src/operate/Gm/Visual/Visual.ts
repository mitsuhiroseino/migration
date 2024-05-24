import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { VisualConfig } from './types';

/**
 * ビジュアル
 *
 * このXビジュアル タイプを使用して画像をアニメーション化する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-visual
 *
 * @param state gmのインスタンス(ステート)
 * @param config Visualのコンフィグ
 * @returns gmのインスタンス
 */
const Visual: GmManipulationFn<VisualConfig> = (state, config) => {
  const { visualType } = config;
  return state.visual(visualType);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.VISUAL, Visual);
export default Visual;
