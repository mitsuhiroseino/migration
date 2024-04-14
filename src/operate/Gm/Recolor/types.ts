import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Recolor`の設定
 */
export type RecolorConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.RECOLOR> & {
  matrix: string;
};
