import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { SteganoConfig } from './types';

/**
 * 透かし非表示
 *
 * 画像内の透かしを非表示にする。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-stegano
 *
 * @param state gmのインスタンス(ステート)
 * @param config Steganoのコンフィグ
 * @returns gmのインスタンス
 */
const Stegano: GmManipulationFn<SteganoConfig> = (state, config) => {
  const { offset } = config;
  return state.stegano(offset);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.STEGANO, Stegano);
export default Stegano;
