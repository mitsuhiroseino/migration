import { ImageType } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Type`の設定
 */
export type TypeConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.TYPE> & {
  imageType: ImageType | string;
};
