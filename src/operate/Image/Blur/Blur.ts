import ImageManipulationFactory from '../ImageManipulationFactory';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { ImageManipulation } from '../types';
import { BlurConfig } from './types';

/**
 * ぼかし
 * @param jimp Jimpのインスタンス
 * @param config Blurのコンフィグ
 * @returns Jimpのインスタンス
 */
const Blur: ImageManipulation<BlurConfig> = async (jimp, config) => {
  const { radius, callback } = config;
  return await jimp.blur(radius, callback);
};
ImageManipulationFactory.register(IMAGE_MANIPULATION_TYPE.BLUR, Blur);
export default Blur;
