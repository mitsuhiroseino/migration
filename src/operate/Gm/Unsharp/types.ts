import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Unsharp`の設定
 */
export type UnsharpConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.UNSHARP> & {
  radius: number;
  sigma?: number;
  amount?: number;
  threshold?: number;
};
