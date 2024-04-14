import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Process`の設定
 */
export type ProcessConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.PROCESS> & {
  command: string;
};
