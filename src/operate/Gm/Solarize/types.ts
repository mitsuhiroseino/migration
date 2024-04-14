import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Solarize`の設定
 */
export type SolarizeConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.SOLARIZE> & {
  threshold: number;
};
