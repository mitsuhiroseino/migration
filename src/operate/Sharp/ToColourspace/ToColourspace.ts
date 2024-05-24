import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationFn } from '../types';
import { ToColourspaceConfig } from './types';

/**
 * 出力カラースペースの設定
 * @param sharp Sharpのインスタンス
 * @param config ToColourspaceのコンフィグ
 * @returns Sharpのインスタンス
 */
const ToColourspace: SharpManipulationFn<ToColourspaceConfig> = (sharp, config) => {
  const { colourspace } = config;
  return sharp.toColourspace(colourspace);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.TO_COLOURSPACE, ToColourspace);
export default ToColourspace;
