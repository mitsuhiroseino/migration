import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationFn } from '../types';
import { EnsureAlphaConfig } from './types';

/**
 * 透明度の追加
 * @param sharp Sharpのインスタンス
 * @param config EnsureAlphaのコンフィグ
 * @returns Sharpのインスタンス
 */
const EnsureAlpha: SharpManipulationFn<EnsureAlphaConfig> = (sharp, config) => {
  const { alpha } = config;
  return sharp.ensureAlpha(alpha);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.ENSURE_ALPHA, EnsureAlpha);
export default EnsureAlpha;
