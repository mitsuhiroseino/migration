import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationFn } from '../types';
import { GammaConfig } from './types';

/**
 * ガンマ補正
 * @param sharp Sharpのインスタンス
 * @param config Gammaのコンフィグ
 * @returns Sharpのインスタンス
 */
const Gamma: SharpManipulationFn<GammaConfig> = (sharp, config) => {
  const { gamma, gammaOut } = config;
  return sharp.gamma(gamma, gammaOut);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.GAMMA, Gamma);
export default Gamma;
