import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { AffineConfig } from './types';

/**
 * アフィン変換
 *
 * 画像にアフィン変換を適用することができる。平行移動、回転、スケーリング、シアーなどの変換が可能である。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-affine
 *
 * @param state gmのインスタンス(ステート)
 * @param config Affineのコンフィグ
 * @returns gmのインスタンス
 */
const Affine: GmManipulation<AffineConfig> = (state, config) => {
  const { matrix } = config;
  return state.affine(matrix);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.AFFINE, Affine);
export default Affine;
