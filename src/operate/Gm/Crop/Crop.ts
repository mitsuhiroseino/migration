import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { CropConfig } from './types';

/**
 * 切り抜き
 *
 * 画像を指定された範囲で切り取ることができる。指定された範囲外の部分が削除される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-crop
 *
 * @param state gmのインスタンス(ステート)
 * @param config Cropのコンフィグ
 * @returns gmのインスタンス
 */
const Crop: GmManipulation<CropConfig> = (state, config) => {
  const { width, height, x, y, percent } = config;
  return state.crop(width, height, x, y, percent);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.CROP, Crop);
export default Crop;
