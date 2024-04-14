import { ColorSpace } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Colorspace`の設定
 */
export type ColorspaceConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.COLORSPACE> & {
  space: ColorSpace | string;
};
