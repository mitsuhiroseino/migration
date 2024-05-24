import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { GeometryConfig } from './types';

/**
 * 幅、高さ、位置調整
 *
 * 画像の幅や高さ、位置を指定することができる。画像のサイズや配置を調整するのに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-geometry
 *
 * @param state gmのインスタンス(ステート)
 * @param config Geometryのコンフィグ
 * @returns gmのインスタンス
 */
const Geometry: GmManipulationFn<GeometryConfig> = (state, config) => {
  const { width, height, option, geometry } = config;
  if (geometry == null) {
    return state.geometry(width, height, option);
  } else {
    return state.geometry(geometry);
  }
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.GEOMETRY, Geometry);
export default Geometry;
