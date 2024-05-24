import ImageManipulationFactory from '../ImageManipulationFactory';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { ImageManipulationFn } from '../types';
import { InvertConfig } from './types';

/**
 * 色の反転
 * @param jimp Jimpのインスタンス
 * @param config Invertのコンフィグ
 * @returns Jimpのインスタンス
 */
const Invert: ImageManipulationFn<InvertConfig> = async (jimp, config) => {
  const { callback } = config;
  return await jimp.invert(callback);
};
ImageManipulationFactory.register(IMAGE_MANIPULATION_TYPE.INVERT, Invert);
export default Invert;
