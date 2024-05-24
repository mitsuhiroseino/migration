import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { ClipConfig } from './types';

/**
 * クリップ
 *
 * 画像をクリッピングすることができる。指定された範囲内のピクセルのみが残り、それ以外のピクセルは削除される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-clip
 *
 * @param state gmのインスタンス(ステート)
 * @param config Clipのコンフィグ
 * @returns gmのインスタンス
 */
const Clip: GmManipulationFn<ClipConfig> = (state, config) => {
  const {} = config;
  return state.clip();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.CLIP, Clip);
export default Clip;
