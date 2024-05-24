import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationFn } from '../types';
import { FlipConfig } from './types';

/**
 * 垂直方向 (上下) にミラーリング
 * @param sharp Sharpのインスタンス
 * @param config Flipのコンフィグ
 * @returns Sharpのインスタンス
 */
const Flip: SharpManipulationFn<FlipConfig> = (sharp, config) => {
  const { flip } = config;
  return sharp.flip(flip);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.FLIP, Flip);
export default Flip;
