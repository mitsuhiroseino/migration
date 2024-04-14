import Jimp from 'jimp';
import ImageManipulationFactory from '../ImageManipulationFactory';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { ImageManipulation } from '../types';
import { MaskConfig } from './types';

/**
 * マスク
 * @param jimp Jimpのインスタンス
 * @param config Maskのコンフィグ
 * @returns Jimpのインスタンス
 */
const Mask: ImageManipulation<MaskConfig> = async (jimp, config) => {
  const { src, x, y, callback } = config;
  const srcJimp = await Jimp.read(src);
  return await jimp.mask(srcJimp, x, y, callback);
};
ImageManipulationFactory.register(IMAGE_MANIPULATION_TYPE.MASK, Mask);
export default Mask;
