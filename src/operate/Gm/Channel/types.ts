import { NamedColor } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Channel`の設定
 */
export type ChannelConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.CHANNEL> & {
  channelType: NamedColor | string;
};
