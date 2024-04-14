import { IntentType } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Intent`の設定
 */
export type IntentConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.INTENT> & {
  intentType: IntentType | string;
};
