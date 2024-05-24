import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationFn } from '../types';
import { ExtendConfig } from './types';

/**
 * 縦横サイズの変更(余白の追加、トリミング)
 * @param sharp Sharpのインスタンス
 * @param config Extendのコンフィグ
 * @returns Sharpのインスタンス
 */
const Extend: SharpManipulationFn<ExtendConfig> = (sharp, config) => {
  const { type, extend, ...options } = config;
  let arg;
  if (extend != null) {
    arg = extend;
  } else {
    arg = options;
  }
  return sharp.extend(arg);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.EXTEND, Extend);
export default Extend;
