import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationFn } from '../types';
import { ThresholdConfig } from './types';

/**
 * しきい値処理(白黒化など)
 * @param sharp Sharpのインスタンス
 * @param config Thresholdのコンフィグ
 * @returns Sharpのインスタンス
 */
const Threshold: SharpManipulationFn<ThresholdConfig> = (sharp, config) => {
  const { type, threshold, ...options } = config;
  return sharp.threshold(threshold, options);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.THRESHOLD, Threshold);
export default Threshold;
