import Jimp from 'jimp';
import { OPERATION_TYPE } from '../constants';
import { OperationConfigBase } from '../types';
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
  manipulations:
    | ImageManipulationConfigBase
    | ImageManipulationConfigBase[]
    | ImageManipulationConfig
    | ImageManipulationConfig[];

  /**
   * 出力時のファイル形式
   */
  mime?: string;
};

export type ImageManipulationConfigBase<T = ImageManipulationType> = {
  type: T;
};

/**
 * 画像操作関数
 */
export type ImageManipulation<C = ImageManipulationConfigBase> = (instance: Jimp, config: C) => Promise<Jimp>;
