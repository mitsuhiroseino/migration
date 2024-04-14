import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulation } from '../types';
import { SharpenConfig } from './types';

/**
 * 鮮明化
 * @param sharp Sharpのインスタンス
 * @param config Sharpenのコンフィグ
 * @returns Sharpのインスタンス
 */
const Sharpen: SharpManipulation<SharpenConfig> = (sharp, config) => {
  const { type, ...options } = config;
  return sharp.sharpen(options);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.SHARPEN, Sharpen);
export default Sharpen;
