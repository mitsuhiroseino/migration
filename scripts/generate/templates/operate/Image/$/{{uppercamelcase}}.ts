import ImageManipulationFactory from '../ImageManipulationFactory';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { ImageManipulation } from '../types';
import { {{{uppercamelcase}}}Config } from './types';

/**
 * {{{description}}}
 * @param jimp Jimpのインスタンス
 * @param config {{{uppercamelcase}}}のコンフィグ
 * @returns Jimpのインスタンス
 */
const {{{uppercamelcase}}}: ImageManipulation<{{{uppercamelcase}}}Config> = async (jimp, config) => {
  const { callback } = config;
  return await jimp.{{{lowercamelcase}}}(callback);
};
ImageManipulationFactory.register(IMAGE_MANIPULATION_TYPE.{{{snakecase}}}, {{{uppercamelcase}}});
export default {{{uppercamelcase}}};
