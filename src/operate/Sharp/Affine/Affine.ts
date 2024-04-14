import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulation } from '../types';
import { AffineConfig } from './types';

/**
 * 画像の変形
 * @param sharp Sharpのインスタンス
 * @param config Affineのコンフィグ
 * @returns Sharpのインスタンス
 */
const Affine: SharpManipulation<AffineConfig> = (sharp, config) => {
  const { type, matrix, ...options } = config;
  return sharp.affine(matrix, options);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.AFFINE, Affine);
export default Affine;
