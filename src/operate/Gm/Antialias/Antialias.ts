import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { AntialiasConfig } from './types';

/**
 * アンチエイリアス処理
 *
 * 画像のアンチエイリアス処理を行うことができる。エッジや線を滑らかにすることができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-antialias
 *
 * @param state gmのインスタンス(ステート)
 * @param config Antialiasのコンフィグ
 * @returns gmのインスタンス
 */
const Antialias: GmManipulation<AntialiasConfig> = (state, config) => {
  const { enable } = config;
  return state.antialias(enable);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.ANTIALIAS, Antialias);
export default Antialias;
