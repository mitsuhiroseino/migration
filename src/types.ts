import { CONTENT_TYPE, ITEM_TYPE, MIGRATION_ITEM_STATUS, MIGRATION_STATUS } from './constants';
import { Input, InputConfig, InputResultBase, Output, OutputConfig, OutputResultBase } from './io/types';
import { Operation, OperationConfigBase, OperationResult } from './operate/types';
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
 * ファイルの内容の型
 */
export type Content = string | Buffer | any;

/**
 * 移行の設定
 */
export type MigrationConfig<OC extends OperationConfigBase = OperationConfigBase> = MigrationTaskSpecificConfig<OC> &
  MigrationJobSpecificConfig<OC> &
  MigrationIterationSpecificConfig &
  MigrationItemSpecificConfig &
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
    tasks: MigrationTaskConfig<OC>[];

    /**
     * タスクを並列で実行する
     */
    parallelTasks?: boolean;
    /**
     * 移行処理開始前のフォーマット有無
     */
    preFormatting?: boolean | FormatOptions;

    /**
     * 移行処理終了後のフォーマット有無
     */
    postFormatting?: boolean | FormatOptions;
  };

/**
 * タスクの設定
 */
export type MigrationTaskConfig<OC extends OperationConfigBase = OperationConfigBase> =
  MigrationTaskSpecificConfig<OC> &
    MigrationJobSpecificConfig<OC> &
    MigrationIterationSpecificConfig &
    MigrationItemSpecificConfig &
    OperateContentConfig & {
      /**
       * タスクID
       */
      taskId?: string;

      /**
       * ジョブの設定
       */
      jobs: MigrationJobConfig<OC>[];
    };

/**
 * ジョブの設定
 */
export type MigrationJobConfig<OC extends OperationConfigBase = OperationConfigBase> = MigrationJobSpecificConfig<OC> &
  MigrationIterationSpecificConfig &
  MigrationItemSpecificConfig &
  OperateContentConfig<OC> & {
    /**
     *  ジョブID
     */
    jobId?: string;
  };

/**
 * イテレーションの設定
 */
export type MigrationIterationConfig = MigrationIterationSpecificConfig &
  MigrationItemSpecificConfig &
  OperateContentConfig & {
    /**
     * イテレーションのID
     * ジョブID+連番
     */
    iterationId?: string;
  };

/**
 * 一連のオペレーション実行時の設定
 */
export type OperateContentConfig<OP = Operation> = CommonConfig &
  OperateContentSpecificConfig & {
    /**
     * フォーマットも含む編集処理前に実行される任意の処理
     * @param content コンテンツ
     * @param config 当コンフィグ
     * @param params 繰り返し処理毎のパラメーター
     * @returns 編集処理対象になるコンテンツ
     */
    initialize?: <C = Content>(content: C, config: OperateContentConfig, params: IterationParams) => Promise<C>;

    /**
     * 操作の設定
     */
    operations?: OP[];

    /**
     * フォーマットも含む編集処理後に実行される任意の処理
     * @param content 編集処理後のコンテンツ
     * @param config 当コンフィグ
     * @param params 繰り返し処理毎のパラメーター
     * @param result 処理結果
     * @returns 最終的なコンテンツ
     */
    finalize?: <C = Content>(
      content: C,
      config: OperateContentConfig,
      params: IterationParams,
      results: OperationResult<C>[],
    ) => Promise<C>;
  };

/**
 * タスク専用の設定
 */
export type MigrationTaskSpecificConfig<OC extends OperationConfigBase = OperationConfigBase> = {
  /**
   * ジョブを並列で実行する
   */
  parallelJobs?: boolean;

  /**
   * タスク開始時のハンドラー
   * @param config タスク設定
   * @returns
   */
  onTaskStart?: (config: MigrationTaskConfig<OC>) => void;

  /**
   * タスク終了時のハンドラー
   * @param result タスク処理結果
   * @param config タスク設定
   * @returns
   */
  onTaskEnd?: (result: MigrationTaskResult, config: MigrationTaskConfig<OC>) => void;
};

/**
 * ジョブ専用の設定
 */
export type MigrationJobSpecificConfig<OC extends OperationConfigBase<any> = OperationConfigBase<any>> = {
  /**
   * 繰り返し処理毎にパラメーターを作成するイテレーターの取得元
   */
  iteration?: ((config: MigrationJobConfig) => Generator<IterationParams>) | IterationParams[] | IterationParams;

  /**
   * ジョブ開始時のハンドラー
   * @param config ジョブ設定
   * @returns
   */
  onJobStart?: (config: MigrationJobConfig<OC>) => void;

  /**
   * ジョブ終了時のハンドラー
   * @param result ジョブ処理結果
   * @param config ジョブ設定
   * @returns
   */
  onJobEnd?: (result: MigrationJobResult, config: MigrationJobConfig<OC>) => void;
};

/**
 * イテレーション専用の設定
 */
export type MigrationIterationSpecificConfig = {
  /**
   * イテレーション開始時のハンドラー
   * @param config イテレーション設定
   * @param params イテレーションパラメーター
   * @returns
   */
  onIterationStart?: (config: MigrationIterationConfig, params: IterationParams) => void;

  /**
   * イテレーション終了時のハンドラー
   * @param result イテレーション処理結果
   * @param config イテレーション設定
   * @param params イテレーションパラメーター
   * @returns
   */
  onIterationEnd?: (
    result: MigrationIterationResult,
    config: MigrationIterationConfig,
    params: IterationParams,
  ) => void;
};

/**
 * 要素処理専用の設定
 */
export type MigrationItemSpecificConfig = {
  /**
   * 要素処理開始時のハンドラー
   * @param config イテレーション設定
   * @param params イテレーションパラメーター
   * @returns
   */
  onItemStart?: (config: MigrationIterationConfig, params: IterationParams) => void;

  /**
   * 要素処理終了時のハンドラー
   * @param result イテレーション処理結果
   * @param config イテレーション設定
   * @param params イテレーションパラメーター
   * @returns
   */
  onItemEnd?: (result: MigrationItemResult, config: MigrationIterationConfig, params: IterationParams) => void;
};

/**
 * 一連のオペレーション実行時専用の設定
 */
export type OperateContentSpecificConfig = {
  /**
   * 移行処理開始前のフォーマット有無
   */
  preFormatting?: FormatOptions;

  /**
   * 移行処理終了後のフォーマット有無
   */
  postFormatting?: FormatOptions;

  /**
   * フォーマット時の設定
   * preFormatting,postFormattingがtrueの場合は、この設定を使用してフォーマットを行う
   */
  formatterOptions?: FormatOptions;
};

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
   * タスク毎の処理結果
   */
  results?: MigrationTaskResult[];

  /**
   * 全体の処理結果
   */
  status: MigrationStatus;

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
   * ジョブ毎の処理結果
   */
  results: MigrationJobResult[];
};

/**
 * ジョブの処理結果
 */
export type MigrationJobResult = {
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
   * 要素毎の処理結果
   */
  results: MigrationItemResult[];
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
  };

/**
 * MigrationConfig以下で継承するコンフィグ
 */
export type CommonConfig = CommonReplacementConfig &
  CommonIoConfig &
  CommonInputConfig &
  CommonOutputConfig &
  CommonDevelopmentConfig &
  CommonLogConfig;

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
 * 入出力に関する設定
 */
export type CommonIoConfig = {
  /**
   * コピー
   */
  copy?: boolean;
};

/**
 * 入力に関する設定
 */
export type CommonInputConfig = {
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
};

/**
 * 出力に関する設定
 */
export type CommonOutputConfig = {
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
