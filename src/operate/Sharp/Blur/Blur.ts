import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulation } from '../types';
import { BlurConfig } from './types';

/**
 * ぼかし
 * @param sharp Sharpのインスタンス
 * @param config Blurのコンフィグ
 * @returns Sharpのインスタンス
 */
const Blur: SharpManipulation<BlurConfig> = (sharp, config) => {
  const { sigma } = config;
  return sharp.blur(sigma);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.BLUR, Blur);
export default Blur;
