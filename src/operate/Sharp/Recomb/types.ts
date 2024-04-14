import SharpLib from 'sharp';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Recomb`の設定
 */
export type RecombConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.RECOMB> & {
  inputMatrix: SharpLib.Matrix3x3;
};
