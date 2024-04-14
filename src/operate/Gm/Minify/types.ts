import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Minify`の設定
 */
export type MinifyConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.MINIFY> & {
  factor: number;
};
