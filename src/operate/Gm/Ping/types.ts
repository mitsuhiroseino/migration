import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Ping`の設定
 */
export type PingConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.PING> & {};
