import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulation } from '../types';
import { ConvolveConfig } from './types';

/**
 * コンボリューション(平滑化、鮮鋭化、エッジ抽出)
 * @param sharp Sharpのインスタンス
 * @param config Convolveのコンフィグ
 * @returns Sharpのインスタンス
 */
const Convolve: SharpManipulation<ConvolveConfig> = (sharp, config) => {
  const { kernel } = config;
  return sharp.convolve(kernel);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.CONVOLVE, Convolve);
export default Convolve;
