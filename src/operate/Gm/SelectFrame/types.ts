import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`SelectFrame`の設定
 */
export type SelectFrameConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.SELECT_FRAME> & {
  frame: number;
};
