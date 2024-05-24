import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { ColorMapConfig } from './types';

/**
 * カラーマップ
 *
 * 画像の色をマッピングすることができる。指定されたカラーマップに基づいて、画像の色を変換する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-colorMap
 *
 * @param state gmのインスタンス(ステート)
 * @param config ColorMapのコンフィグ
 * @returns gmのインスタンス
 */
const ColorMap: GmManipulationFn<ColorMapConfig> = (state, config) => {
  const { colorMapType } = config;
  return state.colorMap(colorMapType);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.COLOR_MAP, ColorMap);
export default ColorMap;
