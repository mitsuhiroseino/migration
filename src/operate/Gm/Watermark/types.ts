import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Watermark`の設定
 */
export type WatermarkConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.WATERMARK> & {
  brightness: number;
  saturation: number;
};
