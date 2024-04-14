import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Page`の設定
 */
export type PageConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.PAGE> & {
  width: number;
  height: number;
  arg?: '%' | '!' | '<' | '>' | string;
};
