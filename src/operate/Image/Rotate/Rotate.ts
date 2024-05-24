import ImageManipulationFactory from '../ImageManipulationFactory';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { ImageManipulationFn } from '../types';
import { RotateConfig } from './types';

/**
 * 回転
 * @param jimp Jimpのインスタンス
 * @param config Rotateのコンフィグ
 * @returns Jimpのインスタンス
 */
const Rotate: ImageManipulationFn<RotateConfig> = async (jimp, config) => {
  const { deg, mode, callback } = config;
  return await jimp.rotate(deg, mode, callback);
};
ImageManipulationFactory.register(IMAGE_MANIPULATION_TYPE.ROTATE, Rotate);
export default Rotate;
