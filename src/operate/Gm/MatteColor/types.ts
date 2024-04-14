import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`MatteColor`の設定
 */
export type MatteColorConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.MATTE_COLOR> & {
  color: string;
};
