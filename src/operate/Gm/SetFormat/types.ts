import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`SetFormat`の設定
 */
export type SetFormatConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.SET_FORMAT> & {
  format: string;
};
