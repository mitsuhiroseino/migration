import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { TypeConfig } from './types';

/**
 * タイプ
 *
 * 2値、グレースケール、パレット、トゥルーカラー、トゥルーカラー+アルファなどを指定。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-type
 *
 * @param state gmのインスタンス(ステート)
 * @param config Typeのコンフィグ
 * @returns gmのインスタンス
 */
const Type: GmManipulation<TypeConfig> = (state, config) => {
  const { imageType } = config;
  return state.type(imageType);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.TYPE, Type);
export default Type;
