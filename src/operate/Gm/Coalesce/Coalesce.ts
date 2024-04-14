import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { CoalesceConfig } from './types';

/**
 * アニメーション
 *
 * 複数の画像を連結することができる。複数の画像を連結して一つのアニメーション画像にする。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-coalesce
 *
 * @param state gmのインスタンス(ステート)
 * @param config Coalesceのコンフィグ
 * @returns gmのインスタンス
 */
const Coalesce: GmManipulation<CoalesceConfig> = (state, config) => {
  const {} = config;
  return state.coalesce();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.COALESCE, Coalesce);
export default Coalesce;
