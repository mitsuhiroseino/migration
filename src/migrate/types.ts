import { Options } from 'prettier';
import { MIGRATION_ITEM_STATUS, MIGRATION_STATUS } from '../constants';
import { CommonInputResult, CommonOutputResult, IoConfig } from '../io';
import { InputConfig } from '../io/inputs';
import { OutputConfig } from '../io/outputs';
import { OperationConfig, OperationResult } from '../operate';
import { FormattingConfig, InputOputputConfig, IterationParams, LogConfig, ReplacementConfig } from '../types';

/**
 * 移行の設定
 */
export type MigrationConfig<OC = OperationConfig, FO = Options> = CommonConfig<OC, FO> &
  MigrationTaskEvents<OC, FO> &
  MigrationJobEvents<OC, FO> &
  MigrationIterationEvents<OC, FO> &
  MigrationItemEvents<OC, FO> & {
    /**
     * ID
     */
    id?: string;

    /**
     * タスクの設定
     */
    tasks: MigrationTaskConfig<OC, FO>[];

    /**
     * タスクを並列で実行する
     */
    parallelTasks?: boolean;
  };

/**
 * タスクの設定
 */
export type MigrationTaskConfig<OC = OperationConfig, FO = Options> = CommonConfig<OC, FO> &
  MigrationTaskEvents<OC, FO> &
  MigrationJobEvents<OC, FO> &
  MigrationIterationEvents<OC, FO> &
  MigrationItemEvents<OC, FO> & {
    /**
     * タスクID
     */
    taskId?: string;

    /**
     * ジョブの設定
     */
    jobs: MigrationJobConfig<OC, FO>[];

    /**
     * ジョブを並列で実行する
     */
    parallelJobs?: boolean;
  };

/**
 * ジョブの設定
 */
export type MigrationJobConfig<OC = OperationConfig, FO = Options> = CommonConfig<OC, FO> &
  MigrationJobEvents<OC, FO> &
  MigrationIterationEvents<OC, FO> &
  MigrationItemEvents<OC, FO> & {
    /**
     *  ジョブID
     */
    jobId?: string;

    /**
     * 入力の設定
     * 文字列を設定した場合はFileとして扱う
     */
    input?: InputConfig | string;

    /**
     * 出力の設定
     * 文字列を設定した場合はFileとして扱う
     */
    output?: OutputConfig | string;

    // 以下はコンテンツの編集に関するプロパティ

    /**
     * フォーマットも含む編集処理前に実行される任意の処理
     * @param content コンテンツ
     * @param config 当コンフィグ
     * @param params 繰り返し処理毎のパラメーター
     * @returns 編集処理対象になるコンテンツ
     */
    initialize?: <C = string | Buffer>(
      content: C,
      config: MigrationJobConfig<OC, FO>,
      params: IterationParams,
    ) => Promise<C>;

    /**
     * 操作の設定
     */
    operations?: OC[];

    /**
     * フォーマットも含む編集処理後に実行される任意の処理
     * @param content 編集処理後のコンテンツ
     * @param config 当コンフィグ
     * @param params 繰り返し処理毎のパラメーター
     * @param result 処理結果
     * @returns 最終的なコンテンツ
     */
    finalize?: <C = string | Buffer>(
      content: C,
      config: MigrationJobConfig<OC, FO>,
      params: IterationParams,
      results: OperationResult<C, OC>[],
    ) => Promise<C>;
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
export type MigrationItemResult = CommonInputResult &
  CommonOutputResult & {
    /**
     * 処理ステータス
     */
    status: MigrationItemStatus;
  };

/**
 * タスク用のイベントハンドラー
 */
type MigrationTaskEvents<OC = OperationConfig, FO = Options> = {
  /**
   * タスク開始時のハンドラー
   * @param config タスク設定
   * @returns
   */
  onTaskStart?: (config: MigrationTaskConfig<OC, FO>) => void;

  /**
   * タスク終了時のハンドラー
   * @param result タスク処理結果
   * @param config タスク設定
   * @returns
   */
  onTaskEnd?: (result: MigrationTaskResult, config: MigrationTaskConfig<OC, FO>) => void;
};

/**
 * ジョブ用のイベントハンドラー
 */
type MigrationJobEvents<OC = OperationConfig, FO = Options> = {
  /**
   * ジョブ開始時のハンドラー
   * @param config ジョブ設定
   * @returns
   */
  onJobStart?: (config: MigrationJobConfig<OC, FO>) => void;

  /**
   * ジョブ終了時のハンドラー
   * @param result ジョブ処理結果
   * @param config ジョブ設定
   * @returns
   */
  onJobEnd?: (result: MigrationJobResult, config: MigrationJobConfig<OC, FO>) => void;
};

/**
 * イテレーション用のイベントハンドラー
 */
type MigrationIterationEvents<OC = OperationConfig, FO = Options> = {
  /**
   * イテレーション開始時のハンドラー
   * @param config イテレーション設定
   * @param params イテレーションパラメーター
   * @returns
   */
  onIterationStart?: (config: MigrationJobConfig<OC, FO>, params: IterationParams) => void;

  /**
   * イテレーション終了時のハンドラー
   * @param result イテレーション処理結果
   * @param config イテレーション設定
   * @param params イテレーションパラメーター
   * @returns
   */
  onIterationEnd?: (
    result: MigrationIterationResult,
    config: MigrationJobConfig<OC, FO>,
    params: IterationParams,
  ) => void;
};

/**
 * 要素処理用のイベントハンドラー
 */
type MigrationItemEvents<OC = OperationConfig, FO = Options> = {
  /**
   * 要素処理開始時のハンドラー
   * @param config イテレーション設定
   * @param params イテレーションパラメーター
   * @returns
   */
  onItemStart?: (config: MigrationJobConfig<OC, FO>, params: IterationParams) => void;

  /**
   * 要素処理終了時のハンドラー
   * @param result イテレーション処理結果
   * @param config イテレーション設定
   * @param params イテレーションパラメーター
   * @returns
   */
  onItemEnd?: (result: MigrationItemResult, config: MigrationJobConfig<OC, FO>, params: IterationParams) => void;
};

export type CommonConfig<OC = OperationConfig, FO = Options> = FormattingConfig<FO> &
  ReplacementConfig &
  InputOputputConfig &
  IterationConfig<OC, FO> &
  LogConfig &
  IoConfig;

type IterationConfig<OC = OperationConfig, FO = Options> = {
  /**
   * 繰り返し処理毎にパラメーターを作成するイテレーターの取得元
   */
  iteration?:
    | ((config: MigrationJobConfig<OC, FO>) => Generator<IterationParams>)
    | IterationParams[]
    | IterationParams;
};
