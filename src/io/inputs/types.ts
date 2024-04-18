import {
  Content,
  FormattingConfig,
  InputOputputConfig,
  IterationParams,
  LogConfig,
  Optional,
  ReplacementConfig,
} from '../../types';
import { FactoriableConfig } from '../../utils/Factory';
import { CommonInputResult } from '../types';
import { INPUT_TYPE } from './constants';

export { default as InputConfig } from './InputConfig';

/**
 * 入力の種別
 */
export type InputType = (typeof INPUT_TYPE)[keyof typeof INPUT_TYPE];

/**
 * 入力の設定
 */
export type InputConfigBase<T = InputType> = FormattingConfig &
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
export type Input<
  C extends Content,
  IC extends InputConfigBase<InputConfigBase['type']> = InputConfigBase<InputConfigBase['type']>,
  R extends CommonInputResult = CommonInputResult,
> = (config: Optional<IC, 'type'>, params: IterationParams) => InputGenerator<C, R>;

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
