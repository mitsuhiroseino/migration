import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { LimitConfig } from './types';

/**
 * リソース制限
 *
 * 画像処理に対するリソースの制限を設定することができる。メモリやCPUの使用量、処理速度などを制御する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-limit
 *
 * @param state gmのインスタンス(ステート)
 * @param config Limitのコンフィグ
 * @returns gmのインスタンス
 */
const Limit: GmManipulationFn<LimitConfig> = (state, config) => {
  const { limitType, val } = config;
  return state.limit(limitType, val);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.LIMIT, Limit);
export default Limit;
