import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Unflatten`の設定
 */
export type UnflattenConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.UNFLATTEN> & {};
