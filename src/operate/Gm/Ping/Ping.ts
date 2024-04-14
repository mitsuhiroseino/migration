import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { PingConfig } from './types';

/**
 * 画像特性
 *
 * 画像の特徴を効率的に判断する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-ping
 *
 * @param state gmのインスタンス(ステート)
 * @param config Pingのコンフィグ
 * @returns gmのインスタンス
 */
const Ping: GmManipulation<PingConfig> = (state, config) => {
  const {} = config;
  return state.ping();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.PING, Ping);
export default Ping;
