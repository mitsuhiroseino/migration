import ImageManipulationFactory from '../ImageManipulationFactory';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { ImageManipulation } from '../types';
import { ContainConfig } from './types';

/**
 * アスペクト比を維持しつつ指定された幅と高さに収まるように拡大／縮小する
 * @param jimp Jimpのインスタンス
 * @param config Containのコンフィグ
 * @returns Jimpのインスタンス
 */
const Contain: ImageManipulation<ContainConfig> = async (jimp, config) => {
  const { width, height, alignBits, mode, callback } = config;
  return await jimp.contain(width, height, alignBits, mode, callback);
};
ImageManipulationFactory.register(IMAGE_MANIPULATION_TYPE.CONTAIN, Contain);
export default Contain;
