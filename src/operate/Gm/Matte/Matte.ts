import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { MatteConfig } from './types';

/**
 * マットチャネル保存
 *
 * 画像にマットチャネルがある場合は、マットチャネルを保存する。画像の透過性や形状を調整することができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-matte
 *
 * @param state gmのインスタンス(ステート)
 * @param config Matteのコンフィグ
 * @returns gmのインスタンス
 */
const Matte: GmManipulation<MatteConfig> = (state, config) => {
  const {} = config;
  return state.matte();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.MATTE, Matte);
export default Matte;
