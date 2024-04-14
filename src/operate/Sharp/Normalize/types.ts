import SharpLib from 'sharp';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Normalize`の設定
 */
export type NormalizeConfig = SharpManipulationConfigBase<
  typeof SHARP_MANIPULATION_TYPE.NORMALIZE
> & {} & SharpLib.NormaliseOptions;
