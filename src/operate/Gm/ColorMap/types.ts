import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`ColorMap`の設定
 */
export type ColorMapConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.COLOR_MAP> & {
  colorMapType: 'shared' | 'private' | string;
};
