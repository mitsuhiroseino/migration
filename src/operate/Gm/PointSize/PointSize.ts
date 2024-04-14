import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { PointSizeConfig } from './types';

/**
 * ポイントサイズ
 *
 * PostScript、X11、またはTrueTypeフォントのポイントサイズ。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-pointSize
 *
 * @param state gmのインスタンス(ステート)
 * @param config PointSizeのコンフィグ
 * @returns gmのインスタンス
 */
const PointSize: GmManipulation<PointSizeConfig> = (state, config) => {
  const { size } = config;
  return state.pointSize(size);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.POINT_SIZE, PointSize);
export default PointSize;
