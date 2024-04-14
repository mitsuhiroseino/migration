import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { ThresholdConfig } from './types';

/**
 * しきい値
 *
 * 画像のしきい値処理を行うことができる。指定した閾値を超えるピクセルを二値化し、画像を分類する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-threshold
 *
 * @param state gmのインスタンス(ステート)
 * @param config Thresholdのコンフィグ
 * @returns gmのインスタンス
 */
const Threshold: GmManipulation<ThresholdConfig> = (state, config) => {
  const { value, percent } = config;
  return state.threshold(value, percent);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.THRESHOLD, Threshold);
export default Threshold;
