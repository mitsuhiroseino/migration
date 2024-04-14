import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Colorize`の設定
 */
export type ColorizeConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.COLORIZE> & {
  red: number;
  green: number;
  blue: number;
};
