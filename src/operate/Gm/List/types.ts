import { ListType } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`List`の設定
 */
export type ListConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.LIST> & {
  listType: ListType | string;
};
