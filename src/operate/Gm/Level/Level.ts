import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { LevelConfig } from './types';

/**
 * コントラストレベル調整
 *
 * 画像のレベルを調整することができる。色の範囲を変更することで、コントラストや明るさを調整する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-level
 *
 * @param state gmのインスタンス(ステート)
 * @param config Levelのコンフィグ
 * @returns gmのインスタンス
 */
const Level: GmManipulation<LevelConfig> = (state, config) => {
  const { blackPoint, gamma, whitePoint, percent } = config;
  return state.level(blackPoint, gamma, whitePoint, percent);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.LEVEL, Level);
export default Level;
