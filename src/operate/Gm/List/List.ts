import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { ListConfig } from './types';

/**
 * リスト
 *
 * 画像ファイルや画像の属性をリストアップすることができる。画像のメタデータやファイル情報を取得するのに使用される。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-list
 *
 * @param state gmのインスタンス(ステート)
 * @param config Listのコンフィグ
 * @returns gmのインスタンス
 */
const List: GmManipulation<ListConfig> = (state, config) => {
  const { listType } = config;
  return state.list(listType);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.LIST, List);
export default List;
