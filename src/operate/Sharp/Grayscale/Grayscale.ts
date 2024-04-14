import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulation } from '../types';
import { GrayscaleConfig } from './types';

/**
 * グレースケール
 * @param sharp Sharpのインスタンス
 * @param config Grayscaleのコンフィグ
 * @returns Sharpのインスタンス
 */
const Grayscale: SharpManipulation<GrayscaleConfig> = (sharp, config) => {
  const { grayscale } = config;
  return sharp.grayscale(grayscale);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.GRAYSCALE, Grayscale);
export default Grayscale;
