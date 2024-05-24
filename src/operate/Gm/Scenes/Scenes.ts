import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { ScenesConfig } from './types';

/**
 * シーン番号の範囲設定
 *
 * 画像内のシーンの範囲を指定することができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-scenes
 *
 * @param state gmのインスタンス(ステート)
 * @param config Scenesのコンフィグ
 * @returns gmのインスタンス
 */
const Scenes: GmManipulationFn<ScenesConfig> = (state, config) => {
  const { start, end } = config;
  return state.scenes(start, end);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.SCENES, Scenes);
export default Scenes;
