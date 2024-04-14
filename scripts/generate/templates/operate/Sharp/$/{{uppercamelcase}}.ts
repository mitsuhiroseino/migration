import ImageManipulationFactory from '../ImageManipulationFactory';
import { IMAGE_MANIPULATION_TYPE } from '../constants';
import { Manipulation } from '../types';
import { {{{uppercamelcase}}}Config } from './types';

/**
 * {{{description}}}
 * @param sharp Sharpのインスタンス
 * @param config {{{uppercamelcase}}}のコンフィグ
 * @returns Sharpのインスタンス
 */
const  {{{uppercamelcase}}}: Manipulation<{{{uppercamelcase}}}Config> = async (sharp, config) => {
  const { type, ...options } = config;
  return await sharp.{{{lowercamelcase}}}(options);
};
ImageManipulationFactory.register(IMAGE_MANIPULATION_TYPE.{{{snakecase}}}, {{{uppercamelcase}}});
export default {{{uppercamelcase}}};
