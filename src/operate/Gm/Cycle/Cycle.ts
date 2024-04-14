import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { CycleConfig } from './types';

/**
 * サイクル
 *
 * 画像を指定された回数だけ複製して連結することができる。アニメーションのループなどに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-cycle
 *
 * @param state gmのインスタンス(ステート)
 * @param config Cycleのコンフィグ
 * @returns gmのインスタンス
 */
const Cycle: GmManipulation<CycleConfig> = (state, config) => {
  const { amount } = config;
  return state.cycle(amount);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.CYCLE, Cycle);
export default Cycle;
