import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { NormalizeConfig } from './types';

/**
 * 正規化
 *
 * 画像の色や明るさを正規化することができる。色のバランスや明るさを一定の基準に合わせる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-normalize
 *
 * @param state gmのインスタンス(ステート)
 * @param config Normalizeのコンフィグ
 * @returns gmのインスタンス
 */
const Normalize: GmManipulationFn<NormalizeConfig> = (state, config) => {
  const {} = config;
  return state.normalize();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.NORMALIZE, Normalize);
export default Normalize;
