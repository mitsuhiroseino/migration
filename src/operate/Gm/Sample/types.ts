import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Sample`の設定
 */
export type SampleConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.SAMPLE> & {
  geometry: string;
};
