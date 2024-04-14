import prettier, { Options } from 'prettier';

/**
 * 1ファイルorディレクトリ毎の処理結果
 */
export const MIGRATION_ITEM_STATUS = {
  /**
   * コピー
   */
  COPIED: 'copied',

  /**
   * 変換
   */
  CONVERTED: 'converted',

  /**
   * 新規作成
   */
  CREATED: 'created',

  /**
   * 処理済
   */
  PROCESSED: 'processed',

  /**
   * スキップ
   */
  SKIPPED: 'skipped',

  /**
   * 処理対象なし
   */
  NONE: 'none',

  /**
   * 未処理
   */
  PENDING: 'pending',
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
} as const;

// 設定されていたらファイルの変換が必要になる設定
export const CONVERSION_CONFIGS = [
  'inputEncoding',
  'initialize',
  'preFormatting',
  'operations',
  'postFormatting',
  'finalize',
  'outputEncoding',
];

/**
 * 親から引き継ぐ設定
 * TODO: 見直し
 */
export const INHERITED_CONFIGS = {
  iteration: true,
  formatter: true,
  preFormatting: true,
  postFormatting: true,
  formatterOptions: true,
  replacementBracket: true,
  removePlaceholders: true,
  flatKeys: true,
  inputEncoding: true,
  outputEncoding: true,
  forceOutput: true,
  silent: true,
  onTaskStart: true,
  onTaskEnd: true,
  onJobStart: true,
  onJobEnd: true,
  onTargetStart: true,
  onTargetEnd: true,
  onIterationStart: true,
  onIterationEnd: true,
  onFileStart: true,
  onFileEnd: true,
};

/**
 * デフォルトのフォーマッター
 * @param content
 * @param options
 * @returns
 */
export async function DEFAULT_FORMATTER(content: string, options: Options): Promise<string> {
  return await prettier.format(content, options);
}

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
  formatter: DEFAULT_FORMATTER,
  formatterOptions: DEFAULT_FORMATTER_OPTIONS,
  replacementBracket: DEFAULT_BRACKET,
};
