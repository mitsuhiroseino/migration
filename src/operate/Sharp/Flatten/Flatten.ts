import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationFn } from '../types';
import { FlattenConfig } from './types';

/**
 * アルファチャンネルの削除
 * @param sharp Sharpのインスタンス
 * @param config Flattenのコンフィグ
 * @returns Sharpのインスタンス
 */
const Flatten: SharpManipulationFn<FlattenConfig> = (sharp, config) => {
  const { flatten, background } = config;
  let arg;
  if (flatten != null) {
    arg = flatten;
  } else if (background != null) {
    arg = { background };
  }
  return sharp.flatten(arg);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.FLATTEN, Flatten);
export default Flatten;
