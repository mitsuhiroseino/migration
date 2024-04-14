import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { PageConfig } from './types';

/**
 * キャンバスのサイズ、位置
 *
 * 画像のページサイズや配置を設定することができる。印刷やレイアウトの際に使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-page
 *
 * @param state gmのインスタンス(ステート)
 * @param config Pageのコンフィグ
 * @returns gmのインスタンス
 */
const Page: GmManipulation<PageConfig> = (state, config) => {
  const { width, height, arg } = config;
  return state.page(width, height, arg);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.PAGE, Page);
export default Page;
