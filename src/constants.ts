import {
  CommonConfig,
  MigrationItemSpecificConfig,
  MigrationIterationSpecificConfig,
  MigrationJobSpecificConfig,
  MigrationTaskSpecificConfig,
  OperateContentSpecificConfig,
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

  /**
   * 非活性
   */
  DISABLED: 'disabled',
} as const;

/**
 * 親から引き継ぐ設定
 */
export const INHERITED_CONFIGS: Required<{
  [K in keyof (MigrationTaskSpecificConfig &
    MigrationJobSpecificConfig &
    MigrationIterationSpecificConfig &
    MigrationItemSpecificConfig &
    OperateContentSpecificConfig &
    CommonConfig)]: boolean | ((config: any, baseConfig: any) => any);
}> = {
  onTaskStart: true,
  onTaskEnd: true,
  parallelJobs: true,
  onJobStart: true,
  onJobEnd: true,
  onIterationStart: true,
  onIterationEnd: true,
  onItemStart: true,
  onItemEnd: true,
  iteration: true,
  preFormatting: true,
  postFormatting: true,
  formatterOptions: true,
  replacementBracket: true,
  removePlaceholders: true,
  flatKeys: true,
  params: (config: any, baseConfig: any) => {
    config.params = { ...baseConfig.params, ...config.params };
    return config;
  },
  input: true,
  inputEncoding: true,
  skipIfNoInput: true,
  output: true,
  outputEncoding: true,
  forceOutput: true,
  disabled: true,
  dryRun: true,
  silent: true,
};

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
} as const;

/**
 * 1ファイルorディレクトリ毎の処理結果
 */
export const MIGRATION_ITEM_STATUS = {
  /**
   * 処理対象なし
   */
  NONE: 'none',

  /**
   * スキップ
   */
  SKIPPED: 'skipped',

  /**
   * 変換
   */
  CONVERTED: 'converted',

  /**
   * 新規作成
   */
  CREATED: 'created',

  /**
   * コピー
   */
  COPIED: 'copied',

  /**
   * 移動
   */
  MOVED: 'moved',

  /**
   * 削除
   */
  DELETED: 'deleted',
} as const;

export const MIGRATION_ITEM_STATUS_PRIORITY = {
  [MIGRATION_ITEM_STATUS.NONE]: 0,
  [MIGRATION_ITEM_STATUS.SKIPPED]: 1,
  [MIGRATION_ITEM_STATUS.CONVERTED]: 2,
  [MIGRATION_ITEM_STATUS.CREATED]: 3,
  [MIGRATION_ITEM_STATUS.COPIED]: 4,
  [MIGRATION_ITEM_STATUS.MOVED]: 5,
  [MIGRATION_ITEM_STATUS.DELETED]: 6,
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
  [OPERATION_STATUS.ERROR]: 3,
};

/**
 * 入出力対象そのものに対する操作
 * ファイルシステム(FS)の場合は、ファイル・ディレクトリに対する操作
 */
export const MANIPULATION_TYPE = {
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
