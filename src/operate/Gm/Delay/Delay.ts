import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { DelayConfig } from './types';

/**
 * 遅延設定
 *
 * アニメーション画像のフレーム間の遅延を設定することができる。各フレームの表示時間を制御する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-delay
 *
 * @param state gmのインスタンス(ステート)
 * @param config Delayのコンフィグ
 * @returns gmのインスタンス
 */
const Delay: GmManipulation<DelayConfig> = (state, config) => {
  const { centiseconds } = config;
  return state.delay(centiseconds);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.DELAY, Delay);
export default Delay;
