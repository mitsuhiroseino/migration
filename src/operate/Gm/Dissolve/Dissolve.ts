import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { DissolveConfig } from './types';

/**
 * トランジション
 *
 * 画像同士を指定された割合で混合することができる。トランジションやフェードイン/フェードアウトのエフェクトを作成するのに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-dissolve
 *
 * @param state gmのインスタンス(ステート)
 * @param config Dissolveのコンフィグ
 * @returns gmのインスタンス
 */
const Dissolve: GmManipulationFn<DissolveConfig> = (state, config) => {
  const { percent } = config;
  return state.dissolve(percent);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.DISSOLVE, Dissolve);
export default Dissolve;
