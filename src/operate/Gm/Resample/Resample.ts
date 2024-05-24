import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { ResampleConfig } from './types';

/**
 * 再サンプリング
 *
 * 画像を指定された水平および垂直解像度にリサンプルする。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-resample
 *
 * @param state gmのインスタンス(ステート)
 * @param config Resampleのコンフィグ
 * @returns gmのインスタンス
 */
const Resample: GmManipulationFn<ResampleConfig> = (state, config) => {
  const { horizontal, vertical } = config;
  return state.resample(horizontal, vertical);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.RESAMPLE, Resample);
export default Resample;
