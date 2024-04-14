import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { MonitorConfig } from './types';

/**
 * モニター
 *
 * 画像処理の進行状況を監視することができる。処理の進捗や統計情報などをリアルタイムで表示する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-monitor
 *
 * @param state gmのインスタンス(ステート)
 * @param config Monitorのコンフィグ
 * @returns gmのインスタンス
 */
const Monitor: GmManipulation<MonitorConfig> = (state, config) => {
  const {} = config;
  return state.monitor();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.MONITOR, Monitor);
export default Monitor;
