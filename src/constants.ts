import {
  CommonConfig,
  InputSpecificConfig,
  IoSpecificConfig,
  IterationSpecificConfig,
  JobSpecificConfig,
  ManipulativeOperationSpecificConfig,
  OperateContentSpecificConfig,
  OutputSpecificConfig,
  TaskSpecificConfig,
} from './types';

/**
 * コンテンツの種別
 */
export const CONTENT_TYPE = {
  /**
   * バイナリー
   * Buffer型の値を扱う場合
   */
  BINARY: 'binary',

  /**
   * テキスト
   * String型の値を扱う場合
   */
  TEXT: 'text',

  /**
   * 任意の型の値
   * オブジェクト、配列、数値、真偽値などの値を扱う場合
   * そのままファイルへ出力した場合はJSON形式のテキストに変換される
   */
  DATA: 'data',

  /**
   * 指定なし
   */
  ANY: 'any',
} as const;

/**
 * 全体の処理結果
 */
export const MIGRATION_STATUS = {
  /**
   * 非活性
   */
  DISABLED: 'disabled',

  /**
   * 繰り返しの終了
   */
  BREAK: 'break',

  /**
   * 処理完了
   */
  SUCCESS: 'success',

  /**
   * 想定されたエラー
   */
  ERROR: 'error',

  /**
   * 想定外のエラー
   */
  FATAL: 'fatal',
} as const;

export const MIGRATION_STATUS_PRIORITY = {
  [MIGRATION_STATUS.DISABLED]: 0,
  [MIGRATION_STATUS.BREAK]: 1,
  [MIGRATION_STATUS.SUCCESS]: 2,
  [MIGRATION_STATUS.ERROR]: 100,
  [MIGRATION_STATUS.FATAL]: 101,
} as const;

/**
 * 親から引き継ぐ設定
 */
export const INHERITED_COMMON_CONFIGS: Required<{
  [K in keyof CommonConfig]: boolean | ((config: any, baseConfig: any) => any);
}> = {
  formatterOptions: true,
  replacementBracket: true,
  removePlaceholders: true,
  flatKeys: true,
  params: (config: any, baseConfig: any) => {
    config.params = { ...baseConfig.params, ...config.params };
    return config;
  },
  forceOutput: true,
  disabled: true,
  dryRun: true,
  silent: true,
} as const;

/**
 * イテレーションからオペレーション実行関数に引き継ぐ設定
 */
export const INHERITED_OPERATE_CONTENT_CONFIGS: Required<{
  [K in keyof (typeof INHERITED_COMMON_CONFIGS & OperateContentSpecificConfig)]:
    | boolean
    | ((config: any, baseConfig: any) => any);
}> = {
  ...INHERITED_COMMON_CONFIGS,
  onOperationsStart: true,
  onOperationsEnd: true,
  onOperationsError: true,
  operations: true,
} as const;

/**
 * 入出力から入力に引き継ぐ設定
 */
export const INHERITED_INPUT_CONFIGS: Required<{
  [K in keyof (typeof INHERITED_COMMON_CONFIGS & InputSpecificConfig)]:
    | boolean
    | ((config: any, baseConfig: any) => any);
}> = {
  ...INHERITED_COMMON_CONFIGS,
  input: true,
  inputEncoding: true,
  notFoundAction: true,
} as const;

/**
 * 入出力から出力に引き継ぐ設定
 */
export const INHERITED_OUTPUT_CONFIGS: Required<{
  [K in keyof (typeof INHERITED_COMMON_CONFIGS & OutputSpecificConfig)]:
    | boolean
    | ((config: any, baseConfig: any) => any);
}> = {
  ...INHERITED_COMMON_CONFIGS,
  output: true,
  outputEncoding: true,
} as const;

/**
 * イテレーションから入出力に引き継ぐ設定
 */
export const INHERITED_IO_CONFIGS: Required<{
  [K in keyof (typeof INHERITED_INPUT_CONFIGS & typeof INHERITED_OUTPUT_CONFIGS & IoSpecificConfig)]:
    | boolean
    | ((config: any, baseConfig: any) => any);
}> = {
  ...INHERITED_INPUT_CONFIGS,
  ...INHERITED_OUTPUT_CONFIGS,
  handlingType: true,
  onItemStart: true,
  onItemEnd: true,
  onItemError: true,
} as const;

/**
 * ジョブからイテレーションに引き継ぐ設定
 */
export const INHERITED_ITERATION_CONFIGS: Required<{
  [K in keyof (typeof INHERITED_OPERATE_CONTENT_CONFIGS & typeof INHERITED_IO_CONFIGS & IterationSpecificConfig)]:
    | boolean
    | ((config: any, baseConfig: any) => any);
}> = {
  ...INHERITED_OPERATE_CONTENT_CONFIGS,
  ...INHERITED_IO_CONFIGS,
  operateEach: true,
  onIterationStart: true,
  onIterationEnd: true,
  onIterationError: true,
} as const;

/**
 * ジョブからマニピュレーションを持つオペレーションに引き継ぐ設定
 */
export const INHERITED_MANIPULATIVE_OPERATION_CONFIGS: Required<{
  [K in keyof (typeof INHERITED_COMMON_CONFIGS & ManipulativeOperationSpecificConfig)]:
    | boolean
    | ((config: any, baseConfig: any) => any);
}> = {
  ...INHERITED_COMMON_CONFIGS,
  onManipulationsStart: true,
  onManipulationsEnd: true,
  onManipulationsError: true,
} as const;

/**
 * タスクからジョブに引き継ぐ設定
 */
export const INHERITED_JOB_CONFIGS: Required<{
  [K in keyof (typeof INHERITED_ITERATION_CONFIGS & typeof INHERITED_OPERATE_CONTENT_CONFIGS & JobSpecificConfig)]:
    | boolean
    | ((config: any, baseConfig: any) => any);
}> = {
  ...INHERITED_ITERATION_CONFIGS,
  ...INHERITED_OPERATE_CONTENT_CONFIGS,
  operations: true,
  iteration: true,
  onJobStart: true,
  onJobEnd: true,
  onJobError: true,
} as const;

/**
 * マイグレーションからタスクに引き継ぐ設定
 */
export const INHERITED_TASK_CONFIGS: Required<{
  [K in keyof (typeof INHERITED_JOB_CONFIGS & TaskSpecificConfig)]: boolean | ((config: any, baseConfig: any) => any);
}> = {
  ...INHERITED_JOB_CONFIGS,
  onTaskStart: true,
  onTaskEnd: true,
  onTaskError: true,
  parallelJobs: true,
} as const;

/**
 * デフォルトフォーマットオプション
 */
export const DEFAULT_FORMATTER_OPTIONS = {};

/**
 * デフォルトの括り文字
 */
export const DEFAULT_BRACKET = ['{{', '}}'];

/**
 * テキストファイルを入出力する際のデフォルトエンコーディング
 */
export const DEFAULT_TEXT_ENCODING = 'utf8';
/**
 * デフォルトの設定
 */
export const DEFAULT_CONFIGS = {
  formatterOptions: DEFAULT_FORMATTER_OPTIONS,
  replacementBracket: DEFAULT_BRACKET,
};

/**
 * 要素の抽象的な分類
 */
export const ITEM_TYPE = {
  /**
   * 子要素を持つ要素
   */
  NODE: 'node',

  /**
   * 子要素を持たない要素
   */
  LEAF: 'leaf',

  /**
   * 要素の区別なし
   */
  ANY: 'any',
} as const;

/**
 * 1ファイルorディレクトリ毎の処理結果
 */
export const MIGRATION_ITEM_STATUS = {
  /**
   * 処理中
   */
  PROCESSING: 'processing',

  /**
   * 処理対象なし
   */
  NONE: 'none',

  /**
   * 繰り返しの終了
   */
  BREAK: 'break',

  /**
   * スキップ
   */
  SKIPPED: 'skipped',

  /**
   * 不明
   */
  UNKNOWN: 'unknown',

  /**
   * 処理済
   */
  PROCESSED: 'processed',

  /**
   * 変換済
   */
  CONVERTED: 'converted',

  /**
   * 新規作成済
   */
  CREATED: 'created',

  /**
   * コピー済
   */
  COPIED: 'copied',

  /**
   * 移動済
   */
  MOVED: 'moved',

  /**
   * 削除済
   */
  DELETED: 'deleted',

  /**
   * エラー
   */
  ERROR: 'error',
} as const;

export const MIGRATION_ITEM_STATUS_PRIORITY = {
  [MIGRATION_ITEM_STATUS.PROCESSING]: 0,
  [MIGRATION_ITEM_STATUS.NONE]: 1,
  [MIGRATION_ITEM_STATUS.BREAK]: 2,
  [MIGRATION_ITEM_STATUS.SKIPPED]: 3,
  [MIGRATION_ITEM_STATUS.UNKNOWN]: 4,
  [MIGRATION_ITEM_STATUS.PROCESSED]: 5,
  [MIGRATION_ITEM_STATUS.CONVERTED]: 6,
  [MIGRATION_ITEM_STATUS.CREATED]: 7,
  [MIGRATION_ITEM_STATUS.COPIED]: 8,
  [MIGRATION_ITEM_STATUS.MOVED]: 9,
  [MIGRATION_ITEM_STATUS.DELETED]: 10,
  [MIGRATION_ITEM_STATUS.ERROR]: 100,
};

/**
 * 内容に対する処理結果
 */
export const OPERATION_STATUS = {
  /**
   * スキップ
   */
  SKIPPED: 'skipped',

  /**
   * 未処理
   */
  UNPROCESSED: 'unprocessed',

  /**
   * 処理済
   */
  PROCESSED: 'processed',

  /**
   * エラー
   */
  ERROR: 'error',
} as const;

export const OPERATION_STATUS_PRIORITY = {
  [OPERATION_STATUS.SKIPPED]: 0,
  [OPERATION_STATUS.UNPROCESSED]: 1,
  [OPERATION_STATUS.PROCESSED]: 2,
  [OPERATION_STATUS.ERROR]: 99,
};

/**
 * 入出力対象そのものに対する操作
 * ファイルシステム(FS)の場合は、ファイル・ディレクトリに対する操作
 */
export const HANDLING_TYPE = {
  /**
   * 複写
   */
  COPY: 'copy',

  /**
   * 移動
   */
  MOVE: 'move',

  /**
   * 削除
   */
  DELETE: 'delete',
} as const;
