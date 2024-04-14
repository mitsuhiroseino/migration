import { GravityDirection } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Gravity`の設定
 */
export type GravityConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.GRAVITY> & {
  direction: GravityDirection | string;
};
