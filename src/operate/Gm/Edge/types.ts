import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Edge`の設定
 */
export type EdgeConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.EDGE> & {
  radius?: number;
};
