import Jimp from 'jimp';
import { CommonConfig } from '../../types';
import { FactoriableConfig } from '../../utils/Factory';
import { OPERATION_TYPE } from '../constants';
import { ManipulationAsyncFn, OperationConfigBase, OperationResult } from '../types';
import ImageManipulationConfig from './ImageManipulationConfig';
import { IMAGE_MANIPULATION_TYPE, IMAGE_OUTPUT_FORMAT } from './constants';

export { default as ImageManipulationConfig } from './ImageManipulationConfig';

/**
 * 画像操作種別
 */
export type ImageManipulationType = (typeof IMAGE_MANIPULATION_TYPE)[keyof typeof IMAGE_MANIPULATION_TYPE];

/**
 * 出力画像フォーマット
 */
export type ImageOutputFormat = (typeof IMAGE_OUTPUT_FORMAT)[keyof typeof IMAGE_OUTPUT_FORMAT];

/**
 * 画像の操作の設定
 */
export type ImageConfig = OperationConfigBase<typeof OPERATION_TYPE.IMAGE> & {
  /**
   * 画像に対する操作
   */
  manipulations: (ImageManipulationConfig | ImageManipulationConfigBase)[];

  /**
   * 出力時のファイル形式
   */
  mime?: string;
};

export type ImageManipulationConfigBase<T = ImageManipulationType> = FactoriableConfig<T> & CommonConfig;

/**
 * 画像操作関数
 */
export type ImageManipulationFn<MC extends ImageManipulationConfigBase = ImageManipulationConfigBase> =
  ManipulationAsyncFn<Jimp, MC>;

export type ImageManipulationResult = OperationResult<Buffer> & { instance: Jimp };
