import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Set`の設定
 */
export type SetConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.SET> & {
  attribute: string;
  value: string;
};
