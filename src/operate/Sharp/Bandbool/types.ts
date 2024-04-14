import SharpLib from 'sharp';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`Bandbool`の設定
 */
export type BandboolConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.BANDBOOL> & {
  boolOp: keyof SharpLib.BoolEnum;
};
