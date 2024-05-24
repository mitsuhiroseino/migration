import SharpManipulationFactory from '../SharpManipulationFactory';
import { SHARP_MANIPULATION_TYPE } from '../constants';
import { SharpManipulationFn } from '../types';
import { ExtractConfig } from './types';

/**
 * 領域の抽出
 * @param sharp Sharpのインスタンス
 * @param config Extractのコンフィグ
 * @returns Sharpのインスタンス
 */
const Extract: SharpManipulationFn<ExtractConfig> = (sharp, config) => {
  const { region } = config;
  return sharp.extract(region);
};
SharpManipulationFactory.register(SHARP_MANIPULATION_TYPE.EXTRACT, Extract);
export default Extract;
