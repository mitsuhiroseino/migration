import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { TreeDepthConfig } from './types';

/**
 * 減色アルゴリズムのツリーの深さ
 *
 * 減色アルゴリズムのツリーの深さを指定することができる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-treeDepth
 *
 * @param state gmのインスタンス(ステート)
 * @param config TreeDepthのコンフィグ
 * @returns gmのインスタンス
 */
const TreeDepth: GmManipulation<TreeDepthConfig> = (state, config) => {
  const { depth } = config;
  return state.treeDepth(depth);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.TREE_DEPTH, TreeDepth);
export default TreeDepth;
