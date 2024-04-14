import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Raise`の設定
 */
export type RaiseConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.RAISE> & {
  width: number;
  height: number;
};
