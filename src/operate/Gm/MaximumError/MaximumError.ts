import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { MaximumErrorConfig } from './types';

/**
 * エラー最大量
 *
 * 合計画像エラーの最大量を指定する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-maximumError
 *
 * @param state gmのインスタンス(ステート)
 * @param config MaximumErrorのコンフィグ
 * @returns gmのインスタンス
 */
const MaximumError: GmManipulation<MaximumErrorConfig> = (state, config) => {
  const { limit } = config;
  return state.maximumError(limit);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.MAXIMUM_ERROR, MaximumError);
export default MaximumError;
