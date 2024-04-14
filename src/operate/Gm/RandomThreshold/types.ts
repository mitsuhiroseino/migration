import { ChannelType } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`RandomThreshold`の設定
 */
export type RandomThresholdConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.RANDOM_THRESHOLD> & {
  channelType: ChannelType;
  LOWxHIGH: string;
};
