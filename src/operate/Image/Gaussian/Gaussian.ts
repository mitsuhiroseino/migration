import ImageManipulationFactory from '../ImageManipulationFactory';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { ImageManipulationFn } from '../types';
import { GaussianConfig } from './types';

/**
 * ガウスぼかし
 * @param jimp Jimpのインスタンス
 * @param config Gaussianのコンフィグ
 * @returns Jimpのインスタンス
 */
const Gaussian: ImageManipulationFn<GaussianConfig> = async (jimp, config) => {
  const { radius, callback } = config;
  return await jimp.gaussian(radius, callback);
};
ImageManipulationFactory.register(IMAGE_MANIPULATION_TYPE.GAUSSIAN, Gaussian);
export default Gaussian;
