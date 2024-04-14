import SharpLib from 'sharp';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Normalise`の設定
 */
export type NormaliseConfig = SharpManipulationConfigBase<
  typeof SHARP_MANIPULATION_TYPE.NORMALISE
> & {} & SharpLib.NormaliseOptions;
