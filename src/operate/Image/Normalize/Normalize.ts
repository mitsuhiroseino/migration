import ImageManipulationFactory from '../ImageManipulationFactory';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { ImageManipulationFn } from '../types';
import { NormalizeConfig } from './types';

/**
 * 色の正規化
 * @param jimp Jimpのインスタンス
 * @param config Normalizeのコンフィグ
 * @returns Jimpのインスタンス
 */
const Normalize: ImageManipulationFn<NormalizeConfig> = async (jimp, config) => {
  const { callback } = config;
  return await jimp.normalize(callback);
};
ImageManipulationFactory.register(IMAGE_MANIPULATION_TYPE.NORMALIZE, Normalize);
export default Normalize;
