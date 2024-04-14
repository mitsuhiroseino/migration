import { ComposeOperator } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Compose`の設定
 */
export type ComposeConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.COMPOSE> & {
  operator: ComposeOperator | string;
};
