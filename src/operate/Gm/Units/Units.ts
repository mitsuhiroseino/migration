import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { UnitsConfig } from './types';

/**
 * 解像度の単位指定
 *
 * 画像の単位を指定することができる。画像の単位をピクセル/インチ、ピクセル/センチなどで指定する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-units
 *
 * @param state gmのインスタンス(ステート)
 * @param config Unitsのコンフィグ
 * @returns gmのインスタンス
 */
const Units: GmManipulationFn<UnitsConfig> = (state, config) => {
  const { unitType } = config;
  return state.units(unitType);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.UNITS, Units);
export default Units;
