import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationFn } from '../types';
import { PipelineColourspaceConfig } from './types';

/**
 * 後続処理の色空間の変更(実験的機能)
 * @param sharp Sharpのインスタンス
 * @param config PipelineColourspaceのコンフィグ
 * @returns Sharpのインスタンス
 */
const PipelineColourspace: SharpManipulationFn<PipelineColourspaceConfig> = (sharp, config) => {
  const { colourspace } = config;
  return sharp.pipelineColourspace(colourspace);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.PIPELINE_COLOURSPACE, PipelineColourspace);
export default PipelineColourspace;
