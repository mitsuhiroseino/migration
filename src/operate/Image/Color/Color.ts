import ImageManipulationFactory from '../ImageManipulationFactory';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { ImageManipulationFn } from '../types';
import { ColorConfig } from './types';

/**
 * 色の調整
 * @param jimp Jimpのインスタンス
 * @param config Colorのコンフィグ
 * @returns Jimpのインスタンス
 */
const Color: ImageManipulationFn<ColorConfig> = async (jimp, config) => {
  const { actions, callback } = config;
  return await jimp.color(actions, callback);
};
ImageManipulationFactory.register(IMAGE_MANIPULATION_TYPE.COLOR, Color);
export default Color;
