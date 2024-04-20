import { MigrationItemStatus } from '../../migrate';
import {
  Content,
  DiffParams,
  FormattingConfig,
  InputOputputConfig,
  IterationParams,
  LogConfig,
  ReplacementConfig,
} from '../../types';
import { FactoriableConfig } from '../../utils/Factory';
import { CommonOutputResult, IoBase, IoType } from '../types';

export { default as OutputConfig } from './OutputConfig';

/**
 * 出力の設定
 */
export type OutputConfigBase<T = IoType> = FormattingConfig &
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
export interface Output<C extends Content, OR extends CommonOutputResult = CommonOutputResult> extends IoBase {
  /**
   * コンテンツの出力
   * @param config
   * @param params
   * @returns
   */
  write(content: C, params: IterationParams): Promise<OutputReturnValue<OR>>;

  /**
   * コンテンツのコピー
   * @param content
   * @param params
   */
  copy(content: C, params: IterationParams): Promise<OutputReturnValue<OR>>;
}

/**
 * 出力処理結果
 */
export type OutputReturnValue<R extends DiffParams> = {
  status: MigrationItemStatus;

  /**
   * 処理に関する情報
   */
  result?: R;
};
