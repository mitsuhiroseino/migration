import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`TextFont`の設定
 */
export type TextFontConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.TEXT_FONT> & {
  font: string;
};
