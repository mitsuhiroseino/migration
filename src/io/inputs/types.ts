import {
  Content,
  FormattingConfig,
  InputOputputConfig,
  IterationParams,
  LogConfig,
  ReplacementConfig,
} from '../../types';
import { FactoriableConfig } from '../../utils/Factory';
import { CommonInputResult, IoBase, IoType } from '../types';

export { default as InputConfig } from './InputConfig';

/**
 * 入力の設定
 */
export type InputConfigBase<T = IoType> = FormattingConfig &
  InputOputputConfig &
  ReplacementConfig &
  LogConfig &
  FactoriableConfig<T> & {
    /**
     * 入力ID
     */
    inputId?: string;
  };

/**
 * 入力用イテレーターを生成するジェネレーター
 */
export type InputGenerator<C extends Content, R extends CommonInputResult = CommonInputResult> = AsyncGenerator<
  InputReturnValue<C, R>
>;

/**
 * コンテンツの入力元
 */
export interface Input<C extends Content, IR extends CommonInputResult = CommonInputResult> extends IoBase {
  /**
   * コンテンツの入力
   */
  read(params: IterationParams): AsyncIterable<InputReturnValue<C, IR>>;

  /**
   * コンテンツのコピー
   */
  copy(params: IterationParams): AsyncIterable<InputReturnValue<C, IR>>;
}

/**
 * 入力処理結果
 */
export type InputReturnValue<C extends Content, R extends CommonInputResult> = {
  /**
   * 読み込んだコンテンツ
   */
  content?: C;

  /**
   * 処理に関する情報
   */
  result?: R;
};
