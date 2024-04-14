import { Content, FormattingConfig, InputOputputConfig, IterationParams, LogConfig, ReplacementConfig } from '../types';
import { OUTPUT_TYPE } from './constants';
import OutputConfig from './OutputConfig';

export { default as OutputConfig } from './OutputConfig';

/**
 * 出力の種別
 */
export type OutputType = (typeof OUTPUT_TYPE)[keyof typeof OUTPUT_TYPE];

export type OutputConfigBase<T = OutputType> = FormattingConfig &
  InputOputputConfig &
  ReplacementConfig &
  LogConfig & {
    /**
     * 出力ID
     */
    outputId?: string;

    /**
     * 出力種別
     */
    type: T;
  };

export type Output<C extends Content, OC extends OutputConfig = OutputConfig> = (
  content: C,
  config: OC,
  params: IterationParams,
) => void;

export type OutputResult<C extends Content> = {
  /**
   * 読み込んだコンテンツ
   */
  content?: C;
};
