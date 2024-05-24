import ImageManipulationFactory from '../ImageManipulationFactory';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { ImageManipulationFn } from '../types';
import { FlipConfig } from './types';

/**
 * 水平または垂直に反転する
 * @param jimp Jimpのインスタンス
 * @param config Flipのコンフィグ
 * @returns Jimpのインスタンス
 */
const Flip: ImageManipulationFn<FlipConfig> = async (jimp, config) => {
  const { horizontal, vertical, callback } = config;
  return await jimp.flip(horizontal, vertical, callback);
};
ImageManipulationFactory.register(IMAGE_MANIPULATION_TYPE.FLIP, Flip);
export default Flip;
