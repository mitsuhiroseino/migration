import ImageManipulationFactory from '../ImageManipulationFactory';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { ImageManipulation } from '../types';
import { PrintConfig } from './types';

/**
 * 文字の描画
 * @param jimp Jimpのインスタンス
 * @param config Printのコンフィグ
 * @returns Jimpのインスタンス
 */
const Print: ImageManipulation<PrintConfig> = async (jimp, config) => {
  const { font, x, y, text, maxWidth, maxHeight, callback } = config;
  return await jimp.print(font, x, y, text, maxWidth, maxHeight, callback);
};
ImageManipulationFactory.register(IMAGE_MANIPULATION_TYPE.PRINT, Print);
export default Print;
