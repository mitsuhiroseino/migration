import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Map`の設定
 */
export type MapConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.MAP> & {
  filename: string;
};
