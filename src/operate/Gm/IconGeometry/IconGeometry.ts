import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { IconGeometryConfig } from './types';

/**
 * アイコンのジオメトリ
 *
 * アイコンのサイズや配置を指定することができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-iconGeometry
 *
 * @param state gmのインスタンス(ステート)
 * @param config IconGeometryのコンフィグ
 * @returns gmのインスタンス
 */
const IconGeometry: GmManipulationFn<IconGeometryConfig> = (state, config) => {
  const { geometry } = config;
  return state.iconGeometry(geometry);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.ICON_GEOMETRY, IconGeometry);
export default IconGeometry;
