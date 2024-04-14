import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Modulate`の設定
 */
export type ModulateConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.MODULATE> & {
  b: number;
  s?: number;
  h?: number;
};
