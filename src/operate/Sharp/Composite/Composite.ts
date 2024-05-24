import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationFn } from '../types';
import { CompositeConfig } from './types';

/**
 * 画像の合成
 * @param sharp Sharpのインスタンス
 * @param config Compositeのコンフィグ
 * @returns Sharpのインスタンス
 */
const Composite: SharpManipulationFn<CompositeConfig> = (sharp, config) => {
  const { images } = config;
  return sharp.composite(images);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.COMPOSITE, Composite);
export default Composite;
