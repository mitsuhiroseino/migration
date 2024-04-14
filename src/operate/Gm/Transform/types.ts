import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Transform`の設定
 */
export type TransformConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.TRANSFORM> & {
  color: string;
};
