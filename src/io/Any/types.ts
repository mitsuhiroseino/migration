import { Content, DiffParams, IterationParams } from '../../types';
import { IO_TYPE } from '../constants';
import {
  InputConfigBase,
  InputResultBase,
  InputReturnValue,
  OutputConfigBase,
  OutputResultBase,
  OutputReturnValue,
} from '../types';

type AsyncInputGenerator<C = Content> = (
  params: IterationParams,
  config: AnyInputConfig,
) => AsyncIterableIterator<InputReturnValue<C, AnyInputResult>>;

/**
 * 任意の入力の設定
 */
export type AnyInputConfig<C = Content> = InputConfigBase<typeof IO_TYPE.ANY> & {
  /**
   * 読み込み時の処理
   * @param params
   * @param config
   * @returns
   */
  read?: AsyncInputGenerator<C>;

  /**
   * コピー時の処理
   * @param params
   * @param config
   * @returns
   */
  copy?: AsyncInputGenerator<C>;

  /**
   * 移動時の処理
   * @param params
   * @param config
   * @returns
   */
  move?: AsyncInputGenerator<C>;

  /**
   * 削除時の処理
   * @param params
   * @param config
   * @returns
   */
  delete?: (params: IterationParams, config: AnyInputConfig) => Promise<DiffParams>;

  /**
   * 任意の設定
   */
  [key: string]: any;
};

/**
 * 任意の入力時の処理結果
 */
export type AnyInputResult = InputResultBase;

/**
 * 任意
 */
export type AnyOutputConfig<C = Content> = OutputConfigBase<typeof IO_TYPE.ANY> & {
  /**
   * 書き込み時の処理
   * @param content
   * @param params
   * @param config
   * @returns
   */
  write?: (content: C, params: IterationParams, config: AnyOutputConfig) => Promise<OutputReturnValue<AnyOutputResult>>;

  /**
   * コピー時の処理
   * @param params
   * @param config
   * @returns
   */
  copy?: (params: IterationParams, config: AnyOutputConfig) => Promise<OutputReturnValue<AnyOutputResult>>;

  /**
   * 移動時の処理
   * @param params
   * @param config
   * @returns
   */
  move?: (params: IterationParams, config: AnyOutputConfig) => Promise<OutputReturnValue<AnyOutputResult>>;

  /**
   * 任意の設定
   */
  [key: string]: any;
};

/**
 * 任意の出力の処理結果
 */
export type AnyOutputResult = OutputResultBase;
