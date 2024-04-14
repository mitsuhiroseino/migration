import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`RawSize`の設定
 */
export type RawSizeConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.RAW_SIZE> & {
  width: number;
  height: number;
  offset?: number;
};
