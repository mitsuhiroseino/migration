import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationFn } from '../types';
import { ToColorspaceConfig } from './types';

/**
 * 出力カラースペースの設定
 * @param sharp Sharpのインスタンス
 * @param config ToColorspaceのコンフィグ
 * @returns Sharpのインスタンス
 */
const ToColorspace: SharpManipulationFn<ToColorspaceConfig> = (sharp, config) => {
  const { colorspace } = config;
  return sharp.toColorspace(colorspace);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.TO_COLORSPACE, ToColorspace);
export default ToColorspace;
