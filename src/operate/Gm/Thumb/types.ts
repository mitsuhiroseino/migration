import { WriteCallback } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Thumb`の設定
 */
export type ThumbConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.THUMB> & {
  width: number;
  height: number;
  outName: string;
  quality?: number;
  align?: 'topleft' | 'center' | string;
  callback: WriteCallback;
};
