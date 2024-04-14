import { ResizeOption } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Thumbnail`の設定
 */
export type ThumbnailConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.THUMBNAIL> & {
  width: number;
  height: number;
  options?: ResizeOption;
};
