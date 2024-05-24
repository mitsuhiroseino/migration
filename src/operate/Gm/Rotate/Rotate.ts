import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { RotateConfig } from './types';

/**
 * 回転
 *
 * 画像を回転させることができる。指定した角度だけ画像を回転させる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-rotate
 *
 * @param state gmのインスタンス(ステート)
 * @param config Rotateのコンフィグ
 * @returns gmのインスタンス
 */
const Rotate: GmManipulationFn<RotateConfig> = (state, config) => {
  const { backgroundColor, degrees } = config;
  return state.rotate(backgroundColor, degrees);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.ROTATE, Rotate);
export default Rotate;
