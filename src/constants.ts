import prettier, { Options } from 'prettier';

/**
 * コンテンツの種別
 */
export const CONTENT_TYPE = {
  /**
   * バイナリー
   */
  BINARY: 'binary',

  /**
   * テキスト
   */
  TEXT: 'text',

  /**
   * オブジェクト、配列など任意の値
   * そのままファイルへ出力した場合はJSON形式のテキストに変換される
   */
  OTHER: 'other',

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
