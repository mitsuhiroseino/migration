import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Antialias`の設定
 */
export type AntialiasConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.ANTIALIAS> & {
  enable: boolean;
};
