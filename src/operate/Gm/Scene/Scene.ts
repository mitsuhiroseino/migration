import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { SceneConfig } from './types';

/**
 * シーン番号設定
 *
 * 画像のシーン番号を設定することができる。複数のシーンが含まれる画像ファイルの特定のシーンを指定する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-scene
 *
 * @param state gmのインスタンス(ステート)
 * @param config Sceneのコンフィグ
 * @returns gmのインスタンス
 */
const Scene: GmManipulationFn<SceneConfig> = (state, config) => {
  const { index } = config;
  return state.scene(index);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.SCENE, Scene);
export default Scene;
