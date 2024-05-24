import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { WaveConfig } from './types';

/**
 * 正弦波
 *
 * 正弦波に沿って画像を変更する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-wave
 *
 * @param state gmのインスタンス(ステート)
 * @param config Waveのコンフィグ
 * @returns gmのインスタンス
 */
const Wave: GmManipulationFn<WaveConfig> = (state, config) => {
  const { amplitude, wavelength } = config;
  return state.wave(amplitude, wavelength);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.WAVE, Wave);
export default Wave;
