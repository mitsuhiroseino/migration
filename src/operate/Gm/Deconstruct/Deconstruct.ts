import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { DeconstructConfig } from './types';

/**
 * 色成分の分解
 *
 * 画像の色を成分ごとに分解することができる。RGBやCMYKなどの成分を個別に操作するのに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-deconstruct
 *
 * @param state gmのインスタンス(ステート)
 * @param config Deconstructのコンフィグ
 * @returns gmのインスタンス
 */
const Deconstruct: GmManipulation<DeconstructConfig> = (state, config) => {
  const {} = config;
  return state.deconstruct();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.DECONSTRUCT, Deconstruct);
export default Deconstruct;
