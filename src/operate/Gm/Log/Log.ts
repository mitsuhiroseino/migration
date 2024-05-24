import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { LogConfig } from './types';

/**
 * ログ
 *
 * 画像処理のログを記録することができる。処理の進捗やエラーなどを記録するのに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-log
 *
 * @param state gmのインスタンス(ステート)
 * @param config Logのコンフィグ
 * @returns gmのインスタンス
 */
const Log: GmManipulationFn<LogConfig> = (state, config) => {
  const { format } = config;
  return state.log(format);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.LOG, Log);
export default Log;
