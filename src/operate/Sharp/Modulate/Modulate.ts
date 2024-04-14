import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulation } from '../types';
import { ModulateConfig } from './types';

/**
 * 明るさ、彩度、色相の回転による画像変換
 * @param sharp Sharpのインスタンス
 * @param config Modulateのコンフィグ
 * @returns Sharpのインスタンス
 */
const Modulate: SharpManipulation<ModulateConfig> = (sharp, config) => {
  const { type, ...options } = config;
  return sharp.modulate(options);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.MODULATE, Modulate);
export default Modulate;
