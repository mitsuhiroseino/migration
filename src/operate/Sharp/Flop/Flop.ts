import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulation } from '../types';
import { FlopConfig } from './types';

/**
 * 水平方向 (左右) にミラーリング
 * @param sharp Sharpのインスタンス
 * @param config Flopのコンフィグ
 * @returns Sharpのインスタンス
 */
const Flop: SharpManipulation<FlopConfig> = (sharp, config) => {
  const { flop } = config;
  return sharp.flop(flop);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.FLOP, Flop);
export default Flop;
