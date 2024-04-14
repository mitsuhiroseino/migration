import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { SnapsConfig } from './types';

/**
 * スナップショット
 *
 * Xサーバー画面から複数の画像を取得し、アニメーションシーケンスを作成する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-snaps
 *
 * @param state gmのインスタンス(ステート)
 * @param config Snapsのコンフィグ
 * @returns gmのインスタンス
 */
const Snaps: GmManipulation<SnapsConfig> = (state, config) => {
  const { count } = config;
  return state.snaps(count);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.SNAPS, Snaps);
export default Snaps;
