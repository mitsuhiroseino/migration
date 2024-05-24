import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { RenderConfig } from './types';

/**
 * レンダリング
 *
 * レンダリングベクター操作。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-render
 *
 * @param state gmのインスタンス(ステート)
 * @param config Renderのコンフィグ
 * @returns gmのインスタンス
 */
const Render: GmManipulationFn<RenderConfig> = (state, config) => {
  const {} = config;
  return state.render();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.RENDER, Render);
export default Render;
