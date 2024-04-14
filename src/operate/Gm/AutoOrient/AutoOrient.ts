import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { AutoOrientConfig } from './types';

/**
 * 自動方向転換
 *
 * 画像の向きを自動的に修正することができる。例えば、Exif情報に基づいて画像を正しい向きに回転させることができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-autoOrient
 *
 * @param state gmのインスタンス(ステート)
 * @param config AutoOrientのコンフィグ
 * @returns gmのインスタンス
 */
const AutoOrient: GmManipulation<AutoOrientConfig> = (state, config) => {
  const {} = config;
  return state.autoOrient();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.AUTO_ORIENT, AutoOrient);
export default AutoOrient;
