import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { RegionConfig } from './types';

/**
 * 領域指定
 *
 * 画像の一部にオプションを適用する。指定した範囲内の画像処理を行う。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-region
 *
 * @param state gmのインスタンス(ステート)
 * @param config Regionのコンフィグ
 * @returns gmのインスタンス
 */
const Region: GmManipulation<RegionConfig> = (state, config) => {
  const { width, height, x, y } = config;
  return state.region(width, height, x, y);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.REGION, Region);
export default Region;
