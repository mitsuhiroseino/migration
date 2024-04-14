import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Background`の設定
 */
export type BackgroundConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.BACKGROUND> & {
  color: string;
};
