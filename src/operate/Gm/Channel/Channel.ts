import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { ChannelConfig } from './types';

/**
 * チャンネル操作
 *
 * 画像の特定のチャンネルを操作することができる。RGBやCMYKなどのチャンネルに対して、異なる処理を適用することができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-channel
 *
 * @param state gmのインスタンス(ステート)
 * @param config Channelのコンフィグ
 * @returns gmのインスタンス
 */
const Channel: GmManipulationFn<ChannelConfig> = (state, config) => {
  const { channelType } = config;
  return state.channel(channelType);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.CHANNEL, Channel);
export default Channel;
