import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { ShearConfig } from './types';

/**
 * せん断
 *
 * X軸またはY軸に沿って画像をせん断する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-shear
 *
 * @param state gmのインスタンス(ステート)
 * @param config Shearのコンフィグ
 * @returns gmのインスタンス
 */
const Shear: GmManipulation<ShearConfig> = (state, config) => {
  const { xDegrees, yDegress } = config;
  return state.shear(xDegrees, yDegress);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.SHEAR, Shear);
export default Shear;
