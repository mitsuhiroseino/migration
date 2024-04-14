import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulation } from '../types';
import { ExtractChannelConfig } from './types';

/**
 * チャンネルの抽出(赤、緑、青、透明度いずれかの抽出)
 * @param sharp Sharpのインスタンス
 * @param config ExtractChannelのコンフィグ
 * @returns Sharpのインスタンス
 */
const ExtractChannel: SharpManipulation<ExtractChannelConfig> = (sharp, config) => {
  const { channel } = config;
  return sharp.extractChannel(channel);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.EXTRACT_CHANNEL, ExtractChannel);
export default ExtractChannel;
