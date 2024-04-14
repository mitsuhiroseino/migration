import { Content, FormattingConfig, InputOputputConfig, IterationParams, LogConfig, ReplacementConfig } from '../types';
import { INPUT_TYPE } from './constants';

export { default as InputConfig } from './InputConfig';

/**
 * 入力の種別
 */
export type InputType = (typeof INPUT_TYPE)[keyof typeof INPUT_TYPE];

export type InputConfigBase<T = InputType> = FormattingConfig &
  InputOputputConfig &
  ReplacementConfig &
  LogConfig & {
    /**
     * 入力ID
     */
    inputId?: string;

    /**
     * 入力種別
     */
    type: T;
  };

export type InputGenerator<C extends Content> = AsyncGenerator<InputResult<C>>;

export type InputResult<C extends Content> = {
  /**
   * 読み込んだコンテンツ
   */
  content?: C;

  /**
   * 追加パラメーター
   */
  params?: IterationParams;
};
