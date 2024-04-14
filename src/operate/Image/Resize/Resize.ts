import ImageManipulationFactory from '../ImageManipulationFactory';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { ImageManipulation } from '../types';
import { ResizeConfig } from './types';

/**
 * リサイズ
 * @param jimp Jimpのインスタンス
 * @param config Resizeのコンフィグ
 * @returns Jimpのインスタンス
 */
const Resize: ImageManipulation<ResizeConfig> = async (jimp, config) => {
  const { width, height, mode, callback } = config;
  return await jimp.resize(width, height, mode, callback);
};
ImageManipulationFactory.register(IMAGE_MANIPULATION_TYPE.RESIZE, Resize);
export default Resize;
