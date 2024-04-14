import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`PipelineColourspace`の設定
 */
export type PipelineColourspaceConfig = SharpManipulationConfigBase<
  typeof SHARP_MANIPULATION_TYPE.PIPELINE_COLOURSPACE
> & {
  colourspace?: string;
};
