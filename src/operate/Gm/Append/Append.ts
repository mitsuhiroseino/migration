import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { AppendConfig } from './types';

/**
 * 画像の連結
 *
 * 複数の画像を連結して一つの画像にすることができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-append
 *
 * @param state gmのインスタンス(ステート)
 * @param config Appendのコンフィグ
 * @returns gmのインスタンス
 */
const Append: GmManipulation<AppendConfig> = (state, config) => {
  const { image, ltr } = config;
  return state.append(image, ltr);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.APPEND, Append);
export default Append;
