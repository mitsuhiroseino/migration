import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationFn } from '../types';
import { UnflattenConfig } from './types';

/**
 * 白い部分の透過(実験的機能)
 * @param sharp Sharpのインスタンス
 * @param config Unflattenのコンフィグ
 * @returns Sharpのインスタンス
 */
const Unflatten: SharpManipulationFn<UnflattenConfig> = (sharp, config) => {
  return sharp.unflatten();
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.UNFLATTEN, Unflatten);
export default Unflatten;
