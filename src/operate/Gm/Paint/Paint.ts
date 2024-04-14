import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { PaintConfig } from './types';

/**
 * 油絵効果
 *
 * 油絵をシミュレートする。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-paint
 *
 * @param state gmのインスタンス(ステート)
 * @param config Paintのコンフィグ
 * @returns gmのインスタンス
 */
const Paint: GmManipulation<PaintConfig> = (state, config) => {
  const { radius } = config;
  return state.paint(radius);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.PAINT, Paint);
export default Paint;
