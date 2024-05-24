import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { MatteColorConfig } from './types';

/**
 * マットチャネル色
 *
 * 画像のマットの色を指定することができる。マットの色や透明度を調整するのに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-matteColor
 *
 * @param state gmのインスタンス(ステート)
 * @param config MatteColorのコンフィグ
 * @returns gmのインスタンス
 */
const MatteColor: GmManipulationFn<MatteColorConfig> = (state, config) => {
  const { color } = config;
  return state.matteColor(color);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.MATTE_COLOR, MatteColor);
export default MatteColor;
