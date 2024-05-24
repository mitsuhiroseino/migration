import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { ChopConfig } from './types';

/**
 * 切り取り
 *
 * 画像から指定された範囲を切り取ることができる。指定された範囲外の部分が削除される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-chop
 *
 * @param state gmのインスタンス(ステート)
 * @param config Chopのコンフィグ
 * @returns gmのインスタンス
 */
const Chop: GmManipulationFn<ChopConfig> = (state, config) => {
  const { width, height, x, y } = config;
  return state.chop(width, height, x, y);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.CHOP, Chop);
export default Chop;
