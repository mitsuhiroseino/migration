import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulation } from '../types';
import { LinearConfig } from './types';

/**
 * レベル調整
 * @param sharp Sharpのインスタンス
 * @param config Linearのコンフィグ
 * @returns Sharpのインスタンス
 */
const Linear: SharpManipulation<LinearConfig> = (sharp, config) => {
  const { multiplier, offset } = config;
  return sharp.linear(multiplier, offset);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.LINEAR, Linear);
export default Linear;
