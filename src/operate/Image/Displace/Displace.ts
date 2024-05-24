import Jimp from 'jimp';
import ImageManipulationFactory from '../ImageManipulationFactory';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { ImageManipulationFn } from '../types';
import { DisplaceConfig } from './types';

/**
 * 画像を歪ませる
 * @param jimp Jimpのインスタンス
 * @param config Displaceのコンフィグ
 * @returns Jimpのインスタンス
 */
const Displace: ImageManipulationFn<DisplaceConfig> = async (jimp, config) => {
  const { map, offset, callback } = config;
  const mapJimp = await Jimp.read(map);
  return await jimp.displace(mapJimp, offset, callback);
};
ImageManipulationFactory.register(IMAGE_MANIPULATION_TYPE.DISPLACE, Displace);
export default Displace;
