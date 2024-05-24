import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationFn } from '../types';
import { RotateConfig } from './types';

/**
 * 回転
 * @param sharp Sharpのインスタンス
 * @param config Rotateのコンフィグ
 * @returns Sharpのインスタンス
 */
const Rotate: SharpManipulationFn<RotateConfig> = (sharp, config) => {
  const { type, angle, ...options } = config;
  return sharp.rotate(angle, options);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.ROTATE, Rotate);
export default Rotate;
