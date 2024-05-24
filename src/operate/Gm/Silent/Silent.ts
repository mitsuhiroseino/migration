import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { SilentConfig } from './types';

/**
 * コンソール出力抑止
 *
 * 画像処理の出力を抑制することができる。処理結果を出力せずに処理を行う。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-silent
 *
 * @param state gmのインスタンス(ステート)
 * @param config Silentのコンフィグ
 * @returns gmのインスタンス
 */
const Silent: GmManipulationFn<SilentConfig> = (state, config) => {
  const {} = config;
  return state.silent();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.SILENT, Silent);
export default Silent;
