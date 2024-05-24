import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { BackgroundConfig } from './types';

/**
 * 背景色
 *
 * 背景を設定することができる。画像に背景色を追加する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-background
 *
 * @param state gmのインスタンス(ステート)
 * @param config Backgroundのコンフィグ
 * @returns gmのインスタンス
 */
const Background: GmManipulationFn<BackgroundConfig> = (state, config) => {
  const { color } = config;
  return state.background(color);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.BACKGROUND, Background);
export default Background;
