import { FilterType } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Filter`の設定
 */
export type FilterConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.FILTER> & {
  filterType: FilterType | string;
};
