import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Bitdepth`の設定
 */
export type BitdepthConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.BITDEPTH> & {
  bits: number;
};
