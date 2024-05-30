import { Content, IterationParams } from '../../../types';
import { IO_TYPE } from '../../constants';
import { OutputConfigBase, OutputResultBase, OutputReturnValue } from '../../types';

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
