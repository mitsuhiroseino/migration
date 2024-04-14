import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { SharpenConfig } from './types';

/**
 * シャープ化
 *
 * 画像をシャープにすることができる。画像の輪郭や細部を強調することで、鮮明さを向上させる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-sharpen
 *
 * @param state gmのインスタンス(ステート)
 * @param config Sharpenのコンフィグ
 * @returns gmのインスタンス
 */
const Sharpen: GmManipulation<SharpenConfig> = (state, config) => {
  const { radius, sigma } = config;
  return state.sharpen(radius, sigma);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.SHARPEN, Sharpen);
export default Sharpen;
