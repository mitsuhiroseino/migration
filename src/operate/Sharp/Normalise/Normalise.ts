import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationFn } from '../types';
import { NormaliseConfig } from './types';

/**
 * コントラスト補正
 * @param sharp Sharpのインスタンス
 * @param config Normaliseのコンフィグ
 * @returns Sharpのインスタンス
 */
const Normalise: SharpManipulationFn<NormaliseConfig> = (sharp, config) => {
  const { type, ...options } = config;
  return sharp.normalise(options);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.NORMALISE, Normalise);
export default Normalise;
