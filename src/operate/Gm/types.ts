import { State } from 'gm';
import { CommonConfig, OperationResult } from '../../types';
import { FactoriableConfig } from '../../utils/Factory';
import { OPERATION_TYPE } from '../constants';
import { ManipulationSyncFn, OperationConfigBase } from '../types';
import GmManipulationConfig from './GmManipulationConfig';
import { GM_MANIPULATION_TYPE, GM_OUTPUT_FORMAT } from './constants';

export { default as GmManipulationConfig } from './GmManipulationConfig';

/**
 * 画像操作種別
 */
export type GmManipulationType = (typeof GM_MANIPULATION_TYPE)[keyof typeof GM_MANIPULATION_TYPE];

/**
 * 出力画像フォーマット
 */
export type GmOutputFormat = (typeof GM_OUTPUT_FORMAT)[keyof typeof GM_OUTPUT_FORMAT];

/**
 * 画像の操作の設定
 */
export type GmConfig = OperationConfigBase<typeof OPERATION_TYPE.IMAGE> & {
  /**
   * 画像に対する操作
   */
  manipulations: (GmManipulationConfig | GmManipulationConfigBase)[];

  /**
   * 出力時のファイル形式
   */
  fileFormat?: string;
};

export type GmManipulationConfigBase<T = GmManipulationType> = FactoriableConfig<T> & CommonConfig;

/**
 * 画像操作関数
 */
export type GmManipulationFn<MC extends GmManipulationConfigBase = GmManipulationConfigBase> = ManipulationSyncFn<
  State,
  MC
>;

export type GmManipulationResult = OperationResult<Buffer> & { instance: State };
