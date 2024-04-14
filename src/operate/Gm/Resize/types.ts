import { ResizeOption } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Resize`の設定
 */
export type ResizeConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.RESIZE> & {
  width: number;
  height?: number;
  option?: ResizeOption;
};
