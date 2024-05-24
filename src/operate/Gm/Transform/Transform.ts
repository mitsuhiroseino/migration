import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { TransformConfig } from './types';

/**
 * 変換
 *
 * イメージを変換する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-transform
 *
 * @param state gmのインスタンス(ステート)
 * @param config Transformのコンフィグ
 * @returns gmのインスタンス
 */
const Transform: GmManipulationFn<TransformConfig> = (state, config) => {
  const { color } = config;
  return state.transform(color);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.TRANSFORM, Transform);
export default Transform;
