import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Emboss`の設定
 */
export type EmbossConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.EMBOSS> & {
  radius?: number;
};
