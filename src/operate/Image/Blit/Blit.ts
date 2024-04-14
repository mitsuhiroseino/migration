import Jimp from 'jimp';
import ImageManipulationFactory from '../ImageManipulationFactory';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { ImageManipulation } from '../types';
import { BlitConfig } from './types';

/**
 * ブール関数を使用して複数の画像を1つに結合する
 * @param jimp Jimpのインスタンス
 * @param config Blitのコンフィグ
 * @returns Jimpのインスタンス
 */
const Blit: ImageManipulation<BlitConfig> = async (jimp, config) => {
  const { src, x, y, srcX, srcY, srcWidth, srcHeight, callback } = config;
  const srcJimp = await Jimp.read(src);
  return await jimp.blit(srcJimp, x, y, srcX, srcY, srcWidth, srcHeight, callback);
};
ImageManipulationFactory.register(IMAGE_MANIPULATION_TYPE.BLIT, Blit);
export default Blit;
