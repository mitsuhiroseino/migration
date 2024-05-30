import { Content, DiffParams, IterationParams } from '../../../types';
import { IO_TYPE } from '../../constants';
import { InputConfigBase, InputGenerator, InputResultBase } from '../../types';

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
  read?: (params: IterationParams, config: AnyInputConfig) => InputGenerator<C, AnyInputResult>;

  /**
   * コピー時の処理
   * @param params
   * @param config
   * @returns
   */
  copy?: (params: IterationParams, config: AnyInputConfig) => InputGenerator<C, AnyInputResult>;

  /**
   * 移動時の処理
   * @param params
   * @param config
   * @returns
   */
  move?: (params: IterationParams, config: AnyInputConfig) => InputGenerator<C, AnyInputResult>;

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
