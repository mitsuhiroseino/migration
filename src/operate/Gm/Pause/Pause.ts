import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { PauseConfig } from './types';

/**
 * 一時停止
 *
 * アニメーション ループ間で一時停止する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-pause
 *
 * @param state gmのインスタンス(ステート)
 * @param config Pauseのコンフィグ
 * @returns gmのインスタンス
 */
const Pause: GmManipulationFn<PauseConfig> = (state, config) => {
  const { seconds } = config;
  return state.pause(seconds);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.PAUSE, Pause);
export default Pause;
