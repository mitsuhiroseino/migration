import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationFn } from '../types';
import { TrimConfig } from './types';

/**
 * 背景色を基準にしたトリミング
 * @param sharp Sharpのインスタンス
 * @param config Trimのコンフィグ
 * @returns Sharpのインスタンス
 */
const Trim: SharpManipulationFn<TrimConfig> = (sharp, config) => {
  const { type, ...options } = config;
  return sharp.trim(options);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.TRIM, Trim);
export default Trim;
