import {
  CommonConfig,
  Content,
  ContentType,
  ManipulativeOperationSpecificConfig,
  OperationResult,
  OperationStatus,
  Optional,
} from '../types';
import { FactoriableConfig } from '../utils/Factory';
import { Condition } from '../utils/isMatch';
import OperationBase from './OperationBase';
import { OPERATION_TYPE } from './constants';

export { default as OperationConfig } from './OperationConfig';

/**
 * コンテンツを操作する際の種別
 */
export type OperationType = (typeof OPERATION_TYPE)[keyof typeof OPERATION_TYPE];

/**
 * 操作の設定
 */
export type OperationConfigBase<T = OperationType | string, C extends Content = Content> = CommonConfig &
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

    /**
     * エラー時の処理を行う関数
     * エラーの場合にデフォルトの値を返したい場合などに利用可能
     * @param content
     * @param params
     * @param error
     * @returns
     */
    onCatch?: (content: C, params: OperationParams, error: unknown) => Promise<OperationResult<C>>;
  };

/**
 * 複数の操作を纏める操作のコンフィグ
 */
export type OperationBundlerConfig = {
  /**
   * 操作
   */
  operations: (OperationConfigBase | OperationBase)[];
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

export type TypedOperationConfig = OperationConfigBase<OperationConfigBase['type'] | string>;

/**
 * 内容に対する操作
 */
export interface Operation<C extends Content = Content> {
  getOperationId(): string;

  /**
   * 1イテレーション毎に実行される前処理
   * @param params
   */
  initialize(params: OperationParams): Promise<void>;

  /**
   * 処理可能か判定する
   * @param content
   * @param params
   */
  isOperable(content: C, params: OperationParams): boolean;

  /**
   * コンテンツを操作する
   * @param content
   * @param params
   */
  operate(content: C, params: OperationParams): Promise<OperationResult<C | Content>>;

  /**
   * 1イテレーション毎に実行される後処理
   * @param params
   */
  finalize(params: OperationParams): Promise<void>;

  /**
   * 1イテレーション毎に実行されるエラー処理
   * @param params
   */
  error(params: OperationParams): Promise<void>;
}

/**
 * 詳細な操作の設定
 */
export type ManipulationConfigBase<T = string> = CommonConfig &
  FactoriableConfig<T> & {
    /**
     * ID
     */
    manipulationId?: string;

    /**
     * 戻り値がtrueだった場合のみ処理を行う
     * 未指定の場合は常に処理対象
     */
    filter?: (instance: any, options?: any) => boolean;
  };

/**
 * 詳細な操作を持つ操作の設定
 */
export type ManipulativeOperationConfig<MC extends ManipulationConfigBase = ManipulationConfigBase> =
  ManipulativeOperationSpecificConfig & {
    /**
     * 詳細な操作
     */
    manipulations: MC[];
  };

/**
 * 内容に対する詳細な操作
 */
export interface Manipulation<I> {
  getManipulationId(): string;

  /**
   * 処理可能か判定する
   * @param instance
   * @param params
   */
  isManipulatable(instance: I, params: OperationParams): boolean;

  /**
   * 初期処理
   * @param instance
   * @param params
   */
  setup(instance: I, params: OperationParams): Promise<OperationStatus>;

  /**
   * コンテンツを操作する
   * @param instance
   * @param params
   */
  manipulate(instance: I, params: OperationParams): Promise<OperationResult<I>>;

  /**
   * 後処理
   * @param instance
   * @param params
   */
  teardown(instance: I, params: OperationParams): Promise<OperationStatus>;
}

/**
 * 操作関数
 */
export type ManipulationAsyncFn<I, MC extends ManipulationConfigBase = ManipulationConfigBase> = (
  instance: I,
  config: Optional<MC, 'type'>,
) => Promise<I>;

/**
 * 操作関数
 */
export type ManipulationSyncFn<I, MC extends ManipulationConfigBase = ManipulationConfigBase> = (
  instance: I,
  config: Optional<MC, 'type'>,
) => I;
