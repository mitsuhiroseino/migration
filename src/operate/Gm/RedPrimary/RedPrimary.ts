import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { RedPrimaryConfig } from './types';

/**
 * 赤の主要成分
 *
 * 画像の赤のプライマリ値を設定することができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-redPrimary
 *
 * @param state gmのインスタンス(ステート)
 * @param config RedPrimaryのコンフィグ
 * @returns gmのインスタンス
 */
const RedPrimary: GmManipulationFn<RedPrimaryConfig> = (state, config) => {
  const { x, y } = config;
  return state.redPrimary(x, y);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.RED_PRIMARY, RedPrimary);
export default RedPrimary;
