import { VisualType } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Visual`の設定
 */
export type VisualConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.VISUAL> & {
  visualType: VisualType | string;
};
