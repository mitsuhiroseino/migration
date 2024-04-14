import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Colors`の設定
 */
export type ColorsConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.COLORS> & {
  colors: number;
};
