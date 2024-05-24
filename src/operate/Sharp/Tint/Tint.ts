import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationFn } from '../types';
import { TintConfig } from './types';

/**
 * 着色
 * @param sharp Sharpのインスタンス
 * @param config Tintのコンフィグ
 * @returns Sharpのインスタンス
 */
const Tint: SharpManipulationFn<TintConfig> = (sharp, config) => {
  const { tint } = config;
  return sharp.tint(tint);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.TINT, Tint);
export default Tint;
