import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { RollConfig } from './types';

/**
 * 垂直／水平回転
 *
 * 画像を垂直または水平に回転させる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-roll
 *
 * @param state gmのインスタンス(ステート)
 * @param config Rollのコンフィグ
 * @returns gmのインスタンス
 */
const Roll: GmManipulation<RollConfig> = (state, config) => {
  const { horizontal, vertical } = config;
  return state.roll(horizontal, vertical);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.ROLL, Roll);
export default Roll;
