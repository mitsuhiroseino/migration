import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Scenes`の設定
 */
export type ScenesConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.SCENES> & {
  start: number;
  end: number;
};
