import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Dissolve`の設定
 */
export type DissolveConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.DISSOLVE> & {
  percent: number;
};
