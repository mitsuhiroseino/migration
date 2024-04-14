import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`SamplingFactor`の設定
 */
export type SamplingFactorConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.SAMPLING_FACTOR> & {
  horizontalFactor: number;
  verticalFactor: number;
};
