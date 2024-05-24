import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { ModeConfig } from './types';

/**
 * 動作モード
 *
 * 画像のモードを設定することができる。カラーモードや画像の表示形式を指定するのに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-mode
 *
 * @param state gmのインスタンス(ステート)
 * @param config Modeのコンフィグ
 * @returns gmのインスタンス
 */
const Mode: GmManipulationFn<ModeConfig> = (state, config) => {
  const { mode } = config;
  return state.mode(mode);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.MODE, Mode);
export default Mode;
