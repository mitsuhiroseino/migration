import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Delay`の設定
 */
export type DelayConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.DELAY> & {
  centiseconds: number;
};
