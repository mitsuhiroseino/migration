import SharpLib from 'sharp';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Resize`の設定
 */
export type ResizeConfig = SharpManipulationConfigBase<
  typeof SHARP_MANIPULATION_TYPE.RESIZE
> & {} & SharpLib.ResizeOptions;
