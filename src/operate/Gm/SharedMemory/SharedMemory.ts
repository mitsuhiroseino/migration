import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { SharedMemoryConfig } from './types';

/**
 * 共有メモリ
 *
 * 画像を共有メモリにロードすることができる。他のプロセスと画像を共有するためのメモリ領域を確保する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-sharedMemory
 *
 * @param state gmのインスタンス(ステート)
 * @param config SharedMemoryのコンフィグ
 * @returns gmのインスタンス
 */
const SharedMemory: GmManipulation<SharedMemoryConfig> = (state, config) => {
  const {} = config;
  return state.sharedMemory();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.SHARED_MEMORY, SharedMemory);
export default SharedMemory;
