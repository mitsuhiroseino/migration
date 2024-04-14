import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { AverageConfig } from './types';

/**
 * 平均値算出
 *
 * 複数の画像の平均値を計算することができる。統計情報の取得や複数の画像をブレンドするのに使用できる。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-average
 *
 * @param state gmのインスタンス(ステート)
 * @param config Averageのコンフィグ
 * @returns gmのインスタンス
 */
const Average: GmManipulation<AverageConfig> = (state, config) => {
  const {} = config;
  return state.average();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.AVERAGE, Average);
export default Average;
