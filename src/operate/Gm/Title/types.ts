import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Title`の設定
 */
export type TitleConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.TITLE> & {
  title: string;
};
