import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { NoiseConfig } from './types';

/**
 * ノイズ
 *
 * 画像にノイズを追加することができる。ランダムなノイズやパターンを画像に適用し、効果を与える。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-noise
 *
 * @param state gmのインスタンス(ステート)
 * @param config Noiseのコンフィグ
 * @returns gmのインスタンス
 */
const Noise: GmManipulation<NoiseConfig> = (state, config) => {
  const { noiseType } = config;
  return state.noise(noiseType);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.NOISE, Noise);
export default Noise;
