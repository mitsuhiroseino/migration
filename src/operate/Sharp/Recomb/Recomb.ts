import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulation } from '../types';
import { RecombConfig } from './types';

/**
 * マトリクスで組み替え
 * @param sharp Sharpのインスタンス
 * @param config Recombのコンフィグ
 * @returns Sharpのインスタンス
 */
const Recomb: SharpManipulation<RecombConfig> = (sharp, config) => {
  const { inputMatrix } = config;
  return sharp.recomb(inputMatrix);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.RECOMB, Recomb);
export default Recomb;
