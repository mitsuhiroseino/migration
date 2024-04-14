import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Charcoal`の設定
 */
export type CharcoalConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.CHARCOAL> & {
  factor: number;
};
