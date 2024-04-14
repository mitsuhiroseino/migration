import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`BorderColor`の設定
 */
export type BorderColorConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.BORDER_COLOR> & {
  color: string;
};
