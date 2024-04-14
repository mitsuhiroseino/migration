import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { ViewConfig } from './types';

/**
 * 表示パラメータ指定
 *
 * FlashPix表示パラメータ指定。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-view
 *
 * @param state gmのインスタンス(ステート)
 * @param config Viewのコンフィグ
 * @returns gmのインスタンス
 */
const View: GmManipulation<ViewConfig> = (state, config) => {
  const {} = config;
  return state.view();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.VIEW, View);
export default View;
