import { HighlightStyle } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`HighlightStyle`の設定
 */
export type HighlightStyleConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.HIGHLIGHT_STYLE> & {
  style: HighlightStyle | string;
};
