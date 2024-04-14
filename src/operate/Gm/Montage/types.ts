import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Montage`の設定
 */
export type MontageConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.MONTAGE> & {
  otherImg: string;
};
