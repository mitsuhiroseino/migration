import prettier, { Options } from 'prettier';

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
} as const;

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
  onItemStart: true,
  onItemEnd: true,
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
