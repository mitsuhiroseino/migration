import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { SelectFrameConfig } from './types';

/**
 * フレーム選択
 *
 * フレームを選択することができる。動画やGIF画像から特定のフレームを選択する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-selectFrame
 *
 * @param state gmのインスタンス(ステート)
 * @param config SelectFrameのコンフィグ
 * @returns gmのインスタンス
 */
const SelectFrame: GmManipulation<SelectFrameConfig> = (state, config) => {
  const { frame } = config;
  return state.selectFrame(frame);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.SELECT_FRAME, SelectFrame);
export default SelectFrame;
