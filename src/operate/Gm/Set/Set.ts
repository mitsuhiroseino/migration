import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { SetConfig } from './types';

/**
 * 画像属性設定
 *
 * 画像の特定の属性を設定することができる。画像のメタデータやプロパティを設定する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-set
 *
 * @param state gmのインスタンス(ステート)
 * @param config Setのコンフィグ
 * @returns gmのインスタンス
 */
const Set: GmManipulation<SetConfig> = (state, config) => {
  const { attribute, value } = config;
  return state.set(attribute, value);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.SET, Set);
export default Set;
