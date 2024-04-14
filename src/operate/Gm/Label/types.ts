import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Label`の設定
 */
export type LabelConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.LABEL> & {
  name: string;
};
