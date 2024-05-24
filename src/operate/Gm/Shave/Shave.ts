import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { ShaveConfig } from './types';

/**
 * ピクセル削除
 *
 * 画像の端からピクセルを削り取る。指定した幅や高さだけ画像の周囲を削除する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-shave
 *
 * @param state gmのインスタンス(ステート)
 * @param config Shaveのコンフィグ
 * @returns gmのインスタンス
 */
const Shave: GmManipulationFn<ShaveConfig> = (state, config) => {
  const { width, height, percent } = config;
  return state.shave(width, height, percent);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.SHAVE, Shave);
export default Shave;
