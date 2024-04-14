import { WriteCallback } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Morph`の設定
 */
export type MorphConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.MORPH> & {
  otherImg: string | string[];
  outName: string;
  callback?: WriteCallback;
};
