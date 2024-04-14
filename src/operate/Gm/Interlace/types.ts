import { InterlaceType } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Interlace`の設定
 */
export type InterlaceConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.INTERLACE> & {
  interlaceType: InterlaceType | string;
};
