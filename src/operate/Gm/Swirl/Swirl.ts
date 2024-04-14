import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { SwirlConfig } from './types';

/**
 * 渦巻き
 *
 * 画像を渦巻状に歪ませることができる。指定した中心点を中心に画像を渦巻き状に回転させる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-swirl
 *
 * @param state gmのインスタンス(ステート)
 * @param config Swirlのコンフィグ
 * @returns gmのインスタンス
 */
const Swirl: GmManipulation<SwirlConfig> = (state, config) => {
  const { degrees } = config;
  return state.swirl(degrees);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.SWIRL, Swirl);
export default Swirl;
