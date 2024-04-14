import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { OperatorConfig } from './types';

/**
 * 演算子
 *
 * 画像チャネルに数学演算子、ビット演算子、または値演算子を適用する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-operator
 *
 * @param state gmのインスタンス(ステート)
 * @param config Operatorのコンフィグ
 * @returns gmのインスタンス
 */
const Operator: GmManipulation<OperatorConfig> = (state, config) => {
  const { channel, operator, rvalue, percent } = config;
  return state.operator(channel, operator, rvalue, percent);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.OPERATOR, Operator);
export default Operator;
