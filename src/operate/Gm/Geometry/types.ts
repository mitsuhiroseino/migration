import { ResizeOption } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Geometry`の設定
 */
export type GeometryConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.GEOMETRY> & {
  width: number;
  height?: number;
  option?: ResizeOption;
  geometry: string;
};
