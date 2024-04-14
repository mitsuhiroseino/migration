import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { RawSizeConfig } from './types';

/**
 * 生のサイズ
 *
 * 画像の生のサイズを指定することができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-rawSize
 *
 * @param state gmのインスタンス(ステート)
 * @param config RawSizeのコンフィグ
 * @returns gmのインスタンス
 */
const RawSize: GmManipulation<RawSizeConfig> = (state, config) => {
  const { width, height, offset } = config;
  return state.rawSize(width, height, offset);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.RAW_SIZE, RawSize);
export default RawSize;
