import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { SampleConfig } from './types';

/**
 * 拡大縮小
 *
 * ピクセルサンプリングを使用して画像を拡大縮小する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-sample
 *
 * @param state gmのインスタンス(ステート)
 * @param config Sampleのコンフィグ
 * @returns gmのインスタンス
 */
const Sample: GmManipulationFn<SampleConfig> = (state, config) => {
  const { geometry } = config;
  return state.sample(geometry);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.SAMPLE, Sample);
export default Sample;
