import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Foreground`の設定
 */
export type ForegroundConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.FOREGROUND> & {
  color: string;
};
