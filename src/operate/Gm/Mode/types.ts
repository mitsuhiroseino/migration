import { OperationMode } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Mode`の設定
 */
export type ModeConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.MODE> & {
  mode: OperationMode | string;
};
