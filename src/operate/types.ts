import { Content, ContentType, FormattingConfig, InputOputputConfig, LogConfig, ReplacementConfig } from '../types';
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
  LogConfig & {
    /**
     * ID
     */
    operationId?: string;

    /**
     * 操作種別
     */
    type?: T;

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
export type ParentOperationConfigBase<
  T = OperationType,
  C = Content,
  OC = OperationConfigBase,
> = OperationConfigBase<T> & {
  /**
   * 子操作
   */
  operations: OC | OC[] | ((content: C, params: OperationParams) => Promise<OC | OC[]>);
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

/**
 * 内容に対する操作
 */
export type Operation<
  C = Content,
  S extends OperationConfigBase<OperationConfigBase['operationId']> = OperationConfigBase<
    OperationConfigBase['operationId']
  >,
> = (content: C, config: S, params: OperationParams) => Promise<C | Content>;

/**
 * 子要素を持つ操作
 */
export type ParentOperation<C = Content, S extends ParentOperationConfigBase = ParentOperationConfigBase> = Operation<
  C,
  S
>;
