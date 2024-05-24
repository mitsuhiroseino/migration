import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationFn } from '../types';
import { JoinChannelConfig } from './types';

/**
 * チャネルの追加(2つの画像を合成した様な効果)
 * @param sharp Sharpのインスタンス
 * @param config JoinChannelのコンフィグ
 * @returns Sharpのインスタンス
 */
const JoinChannel: SharpManipulationFn<JoinChannelConfig> = (sharp, config) => {
  const { type, images, ...options } = config;
  return sharp.joinChannel(images, options);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.JOIN_CHANNEL, JoinChannel);
export default JoinChannel;
