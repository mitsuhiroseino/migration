import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulation } from '../types';
import { NormalizeConfig } from './types';

/**
 * コントラスト補正
 * @param sharp Sharpのインスタンス
 * @param config Normalizeのコンフィグ
 * @returns Sharpのインスタンス
 */
const Normalize: SharpManipulation<NormalizeConfig> = (sharp, config) => {
  const { type, ...options } = config;
  return sharp.normalize(options);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.NORMALIZE, Normalize);
export default Normalize;
