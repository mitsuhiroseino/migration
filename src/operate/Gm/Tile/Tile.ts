import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { TileConfig } from './types';

/**
 * タイル
 *
 * 画像をタイル状に並べることができる。指定したパターンや配置で画像をタイル表示する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-tile
 *
 * @param state gmのインスタンス(ステート)
 * @param config Tileのコンフィグ
 * @returns gmのインスタンス
 */
const Tile: GmManipulationFn<TileConfig> = (state, config) => {
  const { filename } = config;
  return state.tile(filename);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.TILE, Tile);
export default Tile;
