import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Displace`の設定
 */
export type DisplaceConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.DISPLACE> & {
  horizontal: number;
  vertical: number;
};
