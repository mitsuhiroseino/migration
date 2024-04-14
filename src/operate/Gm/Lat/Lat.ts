import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { LatConfig } from './types';

/**
 * ローカル適応しきい値処理
 *
 * 指定された幅、高さ、オフセットを使用して、ローカル適応しきい値処理を実行する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-lat
 *
 * @param state gmのインスタンス(ステート)
 * @param config Latのコンフィグ
 * @returns gmのインスタンス
 */
const Lat: GmManipulation<LatConfig> = (state, config) => {
  const { width, height, offset, percent } = config;
  return state.lat(width, height, offset, percent);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.LAT, Lat);
export default Lat;
