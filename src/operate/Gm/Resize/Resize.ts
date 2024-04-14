import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { ResizeConfig } from './types';

/**
 * リサイズ
 *
 * 画像のリサイズを行うことができる。画像のサイズを指定した幅や高さに変更する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-resize
 *
 * @param state gmのインスタンス(ステート)
 * @param config Resizeのコンフィグ
 * @returns gmのインスタンス
 */
const Resize: GmManipulation<ResizeConfig> = (state, config) => {
  const { width, height, option } = config;
  return state.resize(width, height, option);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.RESIZE, Resize);
export default Resize;
