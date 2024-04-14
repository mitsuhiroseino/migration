import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Stegano`の設定
 */
export type SteganoConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.STEGANO> & {
  offset: number;
};
