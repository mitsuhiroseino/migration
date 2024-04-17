import {
  Content,
  ContentType,
  FormattingConfig,
  InputOputputConfig,
  LogConfig,
  Optional,
  ReplacementConfig,
} from '../types';
import { FactoriableConfig } from '../utils/Factory';
import { Condition } from '../utils/isMatch';
import { OPERATION_TYPE } from './constants';

export { default as OperationConfig } from './OperationConfig';

/**
 * コンテンツを操作する際の種別
 */
export type OperationType = (typeof OPERATION_TYPE)[keyof typeof OPERATION_TYPE];

/**
 * 操作の設定
 */
export type OperationConfigBase<T = OperationType> = FormattingConfig &
  InputOputputConfig &
  ReplacementConfig &
  LogConfig &
  FactoriableConfig<T> & {
    /**
     * ID
     */
    operationId?: string;

    /**
     * 下記の条件に当てはまったコンテンツのみ処理を行う
     * 未指定の場合は全てのコンテンツが処理対象
     * - 文字列で指定した場合はcontentに指定の文字列が含まれているもの
     * - 正規表現の場合はcontentがtestでtrueになったもの
     * - 関数の場合は戻り値がtrueだったもの
     */
    filter?: Condition;
  };

/**
 * 子要素を持つ操作のコンフィグ
 */
export type ParentOperationConfig<C = Content> = {
  /**
   * 子操作
   */
  operations: OperationConfigBase[] | ((content: C, params: OperationParams) => Promise<OperationConfigBase[]>);
};

/**
 * 内容に埋め込む値
 */
export type OperationParams = {
  /**
   * コンテンツ種別
   */
  _contentType?: ContentType;

  /**
   * 任意の値
   */
  [key: string | number]: any;
};

/**
 * 処理の結果
 */
export type OperationResult<C = Content, OC = OperationConfigBase> = { content: C; results: OC[] };

export type TypedOperationConfig = OperationConfigBase<OperationConfigBase['type'] | string>;

/**
 * 内容に対する操作
 */
export type Operation<C extends Content = Content, S extends TypedOperationConfig = TypedOperationConfig> = (
  content: C,
  config: Optional<S, 'type'>,
  params: OperationParams,
) => Promise<C | Content>;
