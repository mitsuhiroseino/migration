import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { BlackThresholdConfig } from './types';

/**
 * 黒のしきい値
 *
 * 画像の黒色の閾値を設定することができる。指定された閾値より暗いピクセルを黒色として扱うことができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-blackThreshold
 *
 * @param state gmのインスタンス(ステート)
 * @param config BlackThresholdのコンフィグ
 * @returns gmのインスタンス
 */
const BlackThreshold: GmManipulationFn<BlackThresholdConfig> = (state, config) => {
  const { intensity, red, green, blue, opacity } = config;
  if (intensity == null) {
    return state.blackThreshold(red, green, blue, opacity);
  } else {
    return state.blackThreshold(intensity);
  }
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.BLACK_THRESHOLD, BlackThreshold);
export default BlackThreshold;
