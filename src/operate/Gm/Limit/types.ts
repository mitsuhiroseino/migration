import { LimitType } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Limit`の設定
 */
export type LimitConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.LIMIT> & {
  limitType: LimitType | string;
  val: string;
};
