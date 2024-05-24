import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { GreenPrimaryConfig } from './types';

/**
 * 緑の主要成分
 *
 * 画像の緑のプライマリ値を設定することができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-greenPrimary
 *
 * @param state gmのインスタンス(ステート)
 * @param config GreenPrimaryのコンフィグ
 * @returns gmのインスタンス
 */
const GreenPrimary: GmManipulationFn<GreenPrimaryConfig> = (state, config) => {
  const { x, y } = config;
  return state.greenPrimary(x, y);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.GREEN_PRIMARY, GreenPrimary);
export default GreenPrimary;
