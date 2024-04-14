import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulation } from '../types';
import { ClaheConfig } from './types';

/**
 * 暗部の鮮明化
 * @param sharp Sharpのインスタンス
 * @param config Claheのコンフィグ
 * @returns Sharpのインスタンス
 */
const Clahe: SharpManipulation<ClaheConfig> = (sharp, config) => {
  const { type, ...options } = config;
  return sharp.clahe(options);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.CLAHE, Clahe);
export default Clahe;
