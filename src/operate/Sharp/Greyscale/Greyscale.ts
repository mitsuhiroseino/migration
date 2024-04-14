import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulation } from '../types';
import { GreyscaleConfig } from './types';

/**
 * グレースケール
 * @param sharp Sharpのインスタンス
 * @param config Greyscaleのコンフィグ
 * @returns Sharpのインスタンス
 */
const Greyscale: SharpManipulation<GreyscaleConfig> = (sharp, config) => {
  const { greyscale } = config;
  return sharp.greyscale(greyscale);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.GREYSCALE, Greyscale);
export default Greyscale;
