import { MigrationItemStatus } from '../../migrate';
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
import { CommonOutputResult } from '../types';
import OutputConfig from './OutputConfig';
import { OUTPUT_TYPE } from './constants';

export { default as OutputConfig } from './OutputConfig';

/**
 * 出力の種別
 */
export type OutputType = (typeof OUTPUT_TYPE)[keyof typeof OUTPUT_TYPE];

/**
 * 出力の設定
 */
export type OutputConfigBase<T = OutputType> = FormattingConfig &
  InputOputputConfig &
  ReplacementConfig &
  LogConfig &
  FactoriableConfig<T> & {
    /**
     * 出力ID
     */
    outputId?: string;
  };

/**
 * コンテンツの出力先
 */
export type Output<
  C extends Content,
  OC extends OutputConfig = OutputConfig,
  OR extends CommonOutputResult = CommonOutputResult,
  OP extends IterationParams = IterationParams,
> = (config: Optional<OC, 'type'>) => (content: C, params: OP) => Promise<OutputReturnValue<OR>>;

/**
 * 出力処理結果
 */
export type OutputReturnValue<R extends IterationParams> = {
  status: MigrationItemStatus;

  /**
   * 処理に関する情報
   */
  result?: R;
};
