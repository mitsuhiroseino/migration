import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { SolarizeConfig } from './types';

/**
 * ソラライズ
 *
 * しきい値レベルを超えるすべてのピクセルを無効にする。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-solarize
 *
 * @param state gmのインスタンス(ステート)
 * @param config Solarizeのコンフィグ
 * @returns gmのインスタンス
 */
const Solarize: GmManipulationFn<SolarizeConfig> = (state, config) => {
  const { threshold } = config;
  return state.solarize(threshold);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.SOLARIZE, Solarize);
export default Solarize;
