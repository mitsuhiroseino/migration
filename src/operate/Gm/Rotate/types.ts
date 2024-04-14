import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Rotate`の設定
 */
export type RotateConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.ROTATE> & {
  backgroundColor: string;
  degrees: number;
};
