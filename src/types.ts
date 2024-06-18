import {
  CONTENT_TYPE,
  HANDLING_TYPE,
  ITEM_TYPE,
  MIGRATION_ITEM_STATUS,
  MIGRATION_STATUS,
  OPERATION_STATUS,
} from './constants';
import { Input, InputConfig, InputResultBase, Output, OutputConfig, OutputResultBase } from './io/types';
import { Operation, OperationConfig, OperationConfigBase } from './operate/types';
import { FormatOptions } from './utils/format';
import { Condition } from './utils/isMatch';
import { DynamicPattern, ReplaceOptions } from './utils/replace';
import { ReplacePlaceholdersOptions, ReplacementValues } from './utils/replacePlaceholders';

/**
 * 要素の種別
 */
export type ItemType = (typeof ITEM_TYPE)[keyof typeof ITEM_TYPE];

/**
 * コンテンツの種別
 */
export type ContentType = (typeof CONTENT_TYPE)[keyof typeof CONTENT_TYPE];

/**
 * 入出力の対象に対する操作の種別
 */
export type HandlingType = (typeof HANDLING_TYPE)[keyof typeof HANDLING_TYPE];

/**
 * ファイルの内容の型
 */
export type Content = string | Buffer | any;

/**
 * 移行の設定
 */
export type MigrationConfig<OC extends OperationConfigBase = OperationConfigBase> = TaskSpecificConfig<OC> &
  JobSpecificConfig<OC> &
  IterationSpecificConfig &
  IoSpecificConfig &
  OperateContentConfig & {
    /**
     * ID
     */
    id?: string;

    /**
     * プラグイン
     */
    plugins?: Plugin | Plugin[];

    /**
     * タスクの設定
     */
    tasks: TaskConfig<OC>[];

    /**
     * タスクを並列で実行する
     */
    parallelTasks?: boolean;

    /**
     * エラー時のハンドラー
     * @param error エラー情報
     * @param config 設定
     * @param params イテレーションパラメーター
     * @returns
     */
    onError?: <E>(error: E, config: any, params?: IterationParams) => void;
  };

/**
 * タスクの設定
 */
export type TaskConfig<OC extends OperationConfigBase = OperationConfigBase> = TaskSpecificConfig<OC> &
  JobSpecificConfig<OC> &
  IterationSpecificConfig &
  IoSpecificConfig &
  OperateContentConfig & {
    /**
     * タスクID
     */
    taskId?: string;

    /**
     * ジョブの設定
     */
    jobs: JobConfig<OC>[];
  };

/**
 * ジョブの設定
 */
export type JobConfig<OC extends OperationConfigBase = OperationConfigBase> = JobSpecificConfig<OC> &
  IterationSpecificConfig &
  IoSpecificConfig &
  OperateContentConfig &
  IoSpecificConfig & {
    /**
     *  ジョブID
     */
    jobId?: string;
  };

/**
 * イテレーションの設定
 */
export type IterationConfig = IterationSpecificConfig &
  IoSpecificConfig &
  OperateContentConfig &
  IoSpecificConfig &
  InputSpecificConfig &
  OutputSpecificConfig & {
    /**
     * イテレーションのID
     * ジョブID+連番
     */
    iterationId?: string;
  };

/**
 * 一連のオペレーション実行時の設定
 */
export type OperateContentConfig = CommonConfig & OperateContentSpecificConfig & ManipulativeOperationSpecificConfig;

/**
 * タスク専用の設定
 */
export type TaskSpecificConfig<OC extends OperationConfigBase = OperationConfigBase> = {
  /**
   * ジョブを並列で実行する
   */
  parallelJobs?: boolean;

  /**
   * タスク開始時のハンドラー
   * @param config タスク設定
   * @returns
   */
  onTaskStart?: (config: TaskConfig<OC>) => void;

  /**
   * タスク終了時のハンドラー
   * @param result タスク処理結果
   * @param config タスク設定
   * @returns
   */
  onTaskEnd?: (result: MigrationTaskResult, config: TaskConfig<OC>) => void;

  /**
   * タスクのエラー時
   * @param error
   * @param config タスク設定
   * @returns
   */
  onTaskError?: <E>(error: E, config: TaskConfig<OC>) => void;
};

/**
 * ジョブ専用の設定
 */
export type JobSpecificConfig<OC extends OperationConfigBase<any> = OperationConfigBase<any>> = {
  /**
   * 操作の設定
   */
  operations?: OperationConfig[];

  /**
   * 繰り返し処理毎にパラメーターを作成するイテレーターの取得元
   */
  iteration?: ((config: JobConfig) => Generator<IterationParams>) | IterationParams[] | IterationParams;

  /**
   * ジョブ開始時のハンドラー
   * @param config ジョブ設定
   * @returns
   */
  onJobStart?: (config: JobConfig<OC>) => void;

  /**
   * ジョブ終了時のハンドラー
   * @param result ジョブ処理結果
   * @param config ジョブ設定
   * @returns
   */
  onJobEnd?: (result: MigrationJobResult, config: JobConfig<OC>) => void;

  /**
   * ジョブのエラー時
   * @param error
   * @param config ジョブ設定
   * @returns
   */
  onJobError?: <E>(error: E, config: JobConfig<OC>) => void;
};

/**
 * イテレーション専用の設定
 */
export type IterationSpecificConfig = {
  /**
   * イテレーション開始時のハンドラー
   * @param config イテレーション設定
   * @param params イテレーションパラメーター
   * @returns
   */
  onIterationStart?: (config: IterationConfig, params: IterationParams) => void;

  /**
   * イテレーション終了時のハンドラー
   * @param result イテレーション処理結果
   * @param config イテレーション設定
   * @param params イテレーションパラメーター
   * @returns
   */
  onIterationEnd?: (result: MigrationIterationResult, config: IterationConfig, params: IterationParams) => void;

  /**
   * イテレーションのエラー時
   * @param error
   * @param config イテレーション設定
   * @param params イテレーションパラメーター
   * @returns
   */
  onIterationError?: <E>(error: E, config: IterationConfig, params: IterationParams) => void;

  /**
   * コンテンツが配列だった場合には配列の要素に対して操作を行う
   */
  operateEach?: boolean;
};

/**
 * 入出力処理専用の設定
 */
export type IoSpecificConfig = {
  /**
   * 入出力の対象そのものに対する操作
   */
  handlingType?: HandlingType;

  /**
   * 要素処理開始時のハンドラー
   * @param config イテレーション設定
   * @param params イテレーションパラメーター
   * @returns
   */
  onItemStart?: (config: IterationConfig, params: IterationParams) => void;

  /**
   * 要素処理終了時のハンドラー
   * @param result イテレーション処理結果
   * @param config イテレーション設定
   * @param params イテレーションパラメーター
   * @returns
   */
  onItemEnd?: (result: MigrationItemResult, config: IterationConfig, params: IterationParams) => void;

  /**
   * 要素処理のエラー時
   * @param error
   * @param config イテレーション設定
   * @param params イテレーションパラメーター
   * @returns
   */
  onItemError?: <E>(error: E, config: IterationConfig, params: IterationParams) => void;
};

/**
 * 入力処理専用の設定
 */
export type InputSpecificConfig = {
  /**
   * 入力の設定
   * 文字列を設定した場合はFileとして扱う
   */
  input?: InputConfig | string;

  /**
   * データ読み込み時のエンコーディング
   * 未指定の場合は読み込み元の内容から判断する
   */
  inputEncoding?: string;

  /**
   * 対象が存在しない場合の処理
   *
   * - error: エラーをスローする
   * - skip: 対象をスキップする
   * - break: 繰り返し処理をブレイクする
   */
  notFoundAction?: 'error' | 'skip' | 'break';
};

/**
 * 出力処理専用の設定
 */
export type OutputSpecificConfig = {
  /**
   * 出力の設定
   * 文字列を設定した場合はFileとして扱う
   */
  output?: OutputConfig | string;

  /**
   * データ書き込み時のエンコーディング
   * 未指定の場合は読み込み時のエンコーディング
   */
  outputEncoding?: string;
};

/**
 * 一連のオペレーション実行時専用の設定
 */
export type OperateContentSpecificConfig = {
  /**
   * 操作の設定
   */
  operations?: Operation[];

  /**
   * 操作前に実行される任意の処理
   * @param content コンテンツ
   * @param config 当コンフィグ
   * @param params 繰り返し処理毎のパラメーター
   * @returns コンテンツ
   */
  onOperationsStart?: <C = Content>(
    content: C,
    config: OperateContentConfig,
    params: IterationParams,
  ) => Promise<C | any>;

  /**
   * 操作後に実行される任意の処理
   * @param status オペレーションの処理結果
   * @param content 編集処理後のコンテンツ
   * @param config 当コンフィグ
   * @param params 繰り返し処理毎のパラメーター
   * @returns コンテンツ
   */
  onOperationsEnd?: <C = Content>(
    status: OperationStatus,
    content: C,
    config: OperateContentConfig,
    params: IterationParams,
  ) => Promise<C | any>;

  /**
   * 操作のエラー時
   * @param error
   * @param content
   * @param config
   * @param params
   * @returns
   */
  onOperationsError?: <E, C = Content>(
    error: E,
    content: C,
    config: OperateContentConfig,
    params: IterationParams,
  ) => void;
};

/**
 * マニピュレーションを持つオペレーション実行時専用の設定
 */
export type ManipulativeOperationSpecificConfig = {
  /**
   * フォーマットもや編集処理前に実行される任意の処理
   * @param content コンテンツ
   * @param config 当コンフィグ
   * @param params 繰り返し処理毎のパラメーター
   * @returns コンテンツ
   */
  onManipulationsStart?: <C = Content>(
    content: C,
    config: OperateContentConfig,
    params: IterationParams,
  ) => Promise<C | any>;

  /**
   * フォーマットや編集処理後に実行される任意の処理
   * @param status オペレーションの処理結果
   * @param content 編集処理後のコンテンツ
   * @param config 当コンフィグ
   * @param params 繰り返し処理毎のパラメーター
   * @returns コンテンツ
   */
  onManipulationsEnd?: <C = Content>(
    status: OperationStatus,
    content: C,
    config: OperateContentConfig,
    params: IterationParams,
  ) => Promise<C | any>;

  /**
   * 操作のエラー時
   * @param error
   * @param content
   * @param config
   * @param params
   * @returns
   */
  onManipulationsError?: <E, C = Content>(
    error: E,
    content: C,
    config: OperateContentConfig,
    params: IterationParams,
  ) => void;
};

/**
 * 内容の処理結果
 */
export type OperationStatus = (typeof OPERATION_STATUS)[keyof typeof OPERATION_STATUS];

/**
 * 1ファイルorディレクトリ毎の処理結果
 */
export type MigrationItemStatus = (typeof MIGRATION_ITEM_STATUS)[keyof typeof MIGRATION_ITEM_STATUS];

/**
 * 全体の処理結果
 */
export type MigrationStatus = (typeof MIGRATION_STATUS)[keyof typeof MIGRATION_STATUS];

/**
 * 結果
 */
export type MigrationResult = {
  /**
   * 全体の処理ステータス
   */
  status: MigrationStatus;

  /**
   * タスク毎の処理結果
   */
  results?: MigrationTaskResult[];

  /**
   * メッセージ
   */
  message?: string;

  /**
   * エラー詳細
   */
  error?: any;
};

/**
 * タスクの処理結果
 */
export type MigrationTaskResult = {
  /**
   * タスクの処理ステータス
   */
  status: MigrationStatus;

  /**
   * ジョブ毎の処理結果
   */
  results: MigrationJobResult[];
};

/**
 * ジョブの処理結果
 */
export type MigrationJobResult = {
  /**
   * ジョブの処理ステータス
   */
  status: MigrationStatus;

  /**
   * イテレーション毎の処理結果
   */
  results: MigrationIterationResult[];
};

/**
 * イテレーションの処理結果
 */
export type MigrationIterationResult = {
  /**
   * イテレーションの処理ステータス
   */
  status: MigrationStatus;

  /**
   * 要素毎の処理結果
   */
  results: MigrationItemResult[];

  /**
   * 繰り返し処理をブレークした
   */
  isBroken?: boolean;
};

/**
 * 要素の処理結果
 */
export type MigrationItemResult = InputResultBase &
  OutputResultBase & {
    /**
     * 処理ステータス
     */
    status: MigrationItemStatus;

    /**
     * コンテンツの処理ステータス
     */
    operationStatus: OperationStatus;
  };

/**
 * 操作の結果
 */
export type OperationResult<C extends Content = Content> = {
  /**
   * コンテンツの処理ステータス
   */
  operationStatus: OperationStatus;

  /**
   * 処理後のコンテンツ
   */
  content: C;
};

/**
 * MigrationConfig以下で継承するコンフィグ
 */
export type CommonConfig = CommonReplacementConfig &
  CommonDevelopmentConfig &
  CommonLogConfig &
  CommonFormatConfig & {};

/**
 * テキストの置換に関する設定
 */
export type CommonReplacementConfig<P extends ReplacementValues = ReplacementValues> = ReplacePlaceholdersOptions & {
  /**
   * プレイスホルダーと置き換えられる値
   */
  params?: P;
};

/**
 * 開発時に利用可能な設定
 */
export type CommonDevelopmentConfig = {
  /**
   * エラーがあってもファイルを出力する
   */
  forceOutput?: boolean;

  /**
   * 無効
   */
  disabled?: boolean;

  /**
   * 操作がどのように実行されるかを確認する
   * trueを設定した場合、ファイルの削除や出力など、現在の状態を変更する可能性のある処理は実行されない
   * 但しHTTPのreadの処理に更新を伴う設定がされている場合は、サーバー側の状態が変わるため注意が必要
   */
  dryRun?: boolean;
};

/**
 * ログに関する設定
 */
export type CommonLogConfig = {
  /**
   * ログを出力しない
   */
  silent?: boolean;
};

/**
 * フォーマットに関する設定
 */
export type CommonFormatConfig<O = FormatOptions> = {
  /**
   * フォーマット時の設定
   */
  formatterOptions?: O;
};

/**
 * フィルタリング可能な入力の設定
 */
export type CommonFilterableConfig<V = any> = {
  /**
   * 下記の条件に当てはまった対象のみ処理対象とする
   * 未指定の場合は全てが処理対象
   * - 文字列で指定した場合は、対象が文字列と部分一致するもの
   * - 正規表現の場合は、対象が正規表現のtestでtrueになったもの
   * - 関数の場合は、戻り値がtrueだったもの
   */
  filter?: Condition<V, IterationParams>;
};

/**
 * プラグイン
 */
export type Plugin = {
  /**
   * プラグインID
   */
  pulginId?: string;

  /**
   * 入力処理
   */
  inputs?: { [type: string]: Constructor<Input<any>> };

  /**
   * 出力処理
   */
  outputs?: { [type: string]: Constructor<Output<any>> };

  /**
   * コンテンツ操作
   */
  operations?: { [type: string]: Constructor<Operation<any>> };
};

/**
 * 動的に変更される文字列
 */
export type VariableString<O extends ReplaceOptions = ReplaceOptions> = string | DynamicPattern<O>;

/**
 * 移行処理で参照する任意のパラメーター
 */
export type ParamsBase = ReplacementValues;

/**
 * 特定の処理で作成したパラメーターの差分
 */
export type DiffParams = ParamsBase;

/**
 * 繰り返し処理内で有効なパラメーター
 * _で始まるプロパティはシステム側で自動的に設定するもの
 * それ以外はMigrationConfigのiteratorで返された値
 */
export type IterationParams<AP = AssignedParams<DiffParams>> = AP & ParamsBase;

/**
 * 特定の処理で作成されたパラメーターをIterationParamsに設定したもの
 */
export type AssignedParams<I> = {
  [K in keyof I as `_${string & K}`]: I[K];
};

/**
 * 指定のプロパティをオプショナルにするユーティリティ型
 */
export type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

/**
 * 指定のプロパティを必須にするユーティリティ型
 */
export type Essential<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

export type Constructor<T> = new (...args: any[]) => T;
