import ImageManipulationFactory from '../ImageManipulationFactory';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { ImageManipulation } from '../types';
import { ScaleConfig } from './types';

/**
 * 拡大／縮小
 * @param jimp Jimpのインスタンス
 * @param config Scaleのコンフィグ
 * @returns Jimpのインスタンス
 */
const Scale: ImageManipulation<ScaleConfig> = async (jimp, config) => {
  const { fit, factor, width, height, mode, callback } = config;
  if (fit) {
    return await jimp.scaleToFit(width, height, mode, callback);
  } else {
    return await jimp.scale(factor, callback);
  }
};
ImageManipulationFactory.register(IMAGE_MANIPULATION_TYPE.SCALE, Scale);
export default Scale;
