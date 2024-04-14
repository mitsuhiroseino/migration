import ImageManipulationFactory from '../ImageManipulationFactory';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { ImageManipulation } from '../types';
import { NormalizeConfig } from './types';

/**
 * 色の正規化
 * @param jimp Jimpのインスタンス
 * @param config Normalizeのコンフィグ
 * @returns Jimpのインスタンス
 */
const Normalize: ImageManipulation<NormalizeConfig> = async (jimp, config) => {
  const { callback } = config;
  return await jimp.normalize(callback);
};
ImageManipulationFactory.register(IMAGE_MANIPULATION_TYPE.NORMALIZE, Normalize);
export default Normalize;
