import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { TrimConfig } from './types';

/**
 * トリミング
 *
 * 画像から余白を自動的にトリミングすることができる。画像の周囲の余白を削除して、本来の内容を切り出す。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-trim
 *
 * @param state gmのインスタンス(ステート)
 * @param config Trimのコンフィグ
 * @returns gmのインスタンス
 */
const Trim: GmManipulation<TrimConfig> = (state, config) => {
  const {} = config;
  return state.trim();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.TRIM, Trim);
export default Trim;
