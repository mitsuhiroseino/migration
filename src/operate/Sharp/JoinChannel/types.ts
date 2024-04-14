import SharpLib from 'sharp';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationConfigBase } from '../types';

/**
 * 画像操作`JoinChannel`の設定
 */
export type JoinChannelConfig = SharpManipulationConfigBase<typeof SHARP_MANIPULATION_TYPE.JOIN_CHANNEL> & {
  images: string | Buffer | ArrayLike<string | Buffer>;
} & SharpLib.SharpOptions;
