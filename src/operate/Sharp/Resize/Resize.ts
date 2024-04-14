import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulation } from '../types';
import { ResizeConfig } from './types';

/**
 * 解像度の変更
 * @param sharp Sharpのインスタンス
 * @param config Resizeのコンフィグ
 * @returns Sharpのインスタンス
 */
const Resize: SharpManipulation<ResizeConfig> = (sharp, config) => {
  const { type, ...options } = config;
  return sharp.resize(options);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.RESIZE, Resize);
export default Resize;
