import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { BackdropConfig } from './types';

/**
 * 背景画像
 *
 * 画像の背景を指定した画像に設定することができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-backdrop
 *
 * @param state gmのインスタンス(ステート)
 * @param config Backdropのコンフィグ
 * @returns gmのインスタンス
 */
const Backdrop: GmManipulationFn<BackdropConfig> = (state, config) => {
  const {} = config;
  return state.backdrop();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.BACKDROP, Backdrop);
export default Backdrop;
