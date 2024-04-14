import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { RecolorConfig } from './types';

/**
 * 再着色
 *
 * 色変換マトリックスを画像チャンネルに適用する。指定した色やパターンで、画像の色を変更する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-recolor
 *
 * @param state gmのインスタンス(ステート)
 * @param config Recolorのコンフィグ
 * @returns gmのインスタンス
 */
const Recolor: GmManipulation<RecolorConfig> = (state, config) => {
  const { matrix } = config;
  return state.recolor(matrix);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.RECOLOR, Recolor);
export default Recolor;
