import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { ShadowConfig } from './types';

/**
 * シャドウ
 *
 * モンタージュに影を付ける。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-shadow
 *
 * @param state gmのインスタンス(ステート)
 * @param config Shadowのコンフィグ
 * @returns gmのインスタンス
 */
const Shadow: GmManipulationFn<ShadowConfig> = (state, config) => {
  const { radius, sigma } = config;
  return state.shadow(radius, sigma);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.SHADOW, Shadow);
export default Shadow;
