import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { WatermarkConfig } from './types';

/**
 * ウォーターマーク
 *
 * 透かしの明るさと彩度のパーセント指定。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-watermark
 *
 * @param state gmのインスタンス(ステート)
 * @param config Watermarkのコンフィグ
 * @returns gmのインスタンス
 */
const Watermark: GmManipulationFn<WatermarkConfig> = (state, config) => {
  const { brightness, saturation } = config;
  return state.watermark(brightness, saturation);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.WATERMARK, Watermark);
export default Watermark;
