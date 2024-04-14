import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`HighlightColor`の設定
 */
export type HighlightColorConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.HIGHLIGHT_COLOR> & {
  color: string;
};
