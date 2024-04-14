import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { DisplaceConfig } from './types';

/**
 * ピクセル変位
 *
 * 画像のピクセルを指定されたマップに基づいて変位させることができる。歪みや効果を与えるのに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-displace
 *
 * @param state gmのインスタンス(ステート)
 * @param config Displaceのコンフィグ
 * @returns gmのインスタンス
 */
const Displace: GmManipulation<DisplaceConfig> = (state, config) => {
  const { horizontal, vertical } = config;
  return state.displace(horizontal, vertical);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.DISPLACE, Displace);
export default Displace;
