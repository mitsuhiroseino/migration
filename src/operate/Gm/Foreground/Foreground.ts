import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { ForegroundConfig } from './types';

/**
 * 前景色
 *
 * 画像に前景色を指定することができる。文字や形状の描画などに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-foreground
 *
 * @param state gmのインスタンス(ステート)
 * @param config Foregroundのコンフィグ
 * @returns gmのインスタンス
 */
const Foreground: GmManipulationFn<ForegroundConfig> = (state, config) => {
  const { color } = config;
  return state.foreground(color);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.FOREGROUND, Foreground);
export default Foreground;
