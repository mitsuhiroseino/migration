import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { WhitePointConfig } from './types';

/**
 * ホワイトポイント
 *
 * 画像のホワイトポイントを設定することができる。画像のホワイトポイントを調整する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-whitePoint
 *
 * @param state gmのインスタンス(ステート)
 * @param config WhitePointのコンフィグ
 * @returns gmのインスタンス
 */
const WhitePoint: GmManipulationFn<WhitePointConfig> = (state, config) => {
  const { x, y } = config;
  return state.whitePoint(x, y);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.WHITE_POINT, WhitePoint);
export default WhitePoint;
