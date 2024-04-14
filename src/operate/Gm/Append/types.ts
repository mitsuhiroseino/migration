import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Append`の設定
 */
export type AppendConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.APPEND> & {
  image: string | string[];
  ltr?: boolean;
};
