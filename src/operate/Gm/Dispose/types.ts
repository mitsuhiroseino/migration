import { DisposeMethod } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Dispose`の設定
 */
export type DisposeConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.DISPOSE> & {
  method: DisposeMethod | string;
};
