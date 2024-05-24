import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { BluePrimaryConfig } from './types';

/**
 * 青の主要成分
 *
 * 画像の青のプライマリ値を設定することができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-bluePrimary
 *
 * @param state gmのインスタンス(ステート)
 * @param config BluePrimaryのコンフィグ
 * @returns gmのインスタンス
 */
const BluePrimary: GmManipulationFn<BluePrimaryConfig> = (state, config) => {
  const { x, y } = config;
  return state.bluePrimary(x, y);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.BLUE_PRIMARY, BluePrimary);
export default BluePrimary;
