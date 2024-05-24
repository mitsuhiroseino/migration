import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { ProcessConfig } from './types';

/**
 * プロセス
 *
 * プロセスモジュールを使用して一連の画像を処理する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-process
 *
 * @param state gmのインスタンス(ステート)
 * @param config Processのコンフィグ
 * @returns gmのインスタンス
 */
const Process: GmManipulationFn<ProcessConfig> = (state, config) => {
  const { command } = config;
  return state.process(command);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.PROCESS, Process);
export default Process;
