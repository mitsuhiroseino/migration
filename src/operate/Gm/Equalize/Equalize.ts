import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { EqualizeConfig } from './types';

/**
 * ヒストグラム均等化
 *
 * 画像のヒストグラムを均等化することができる。ヒストグラム均等化により、画像のコントラストを向上させることができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-equalize
 *
 * @param state gmのインスタンス(ステート)
 * @param config Equalizeのコンフィグ
 * @returns gmのインスタンス
 */
const Equalize: GmManipulationFn<EqualizeConfig> = (state, config) => {
  const {} = config;
  return state.equalize();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.EQUALIZE, Equalize);
export default Equalize;
