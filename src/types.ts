import { Options } from 'prettier';
import { DynamicPattern, ReplaceOptions } from './utils/replace';
import { ReplacePlaceholdersOptions, ReplacementValues } from './utils/replacePlaceholders';

/**
 * ファイルの内容の型
 */
export type Content = string | Buffer | any;

/**
 * テキストのフォーマット処理に関する設定
 */
export type FormattingConfig<O = Options> = {
  /**
   * フォーマッターの指定
   * @param content コンテンツ
   * @param options オプション
   * @returns
   */
  formatter?: (content: string, options: O) => Promise<string>;

  /**
   * 移行処理開始前のフォーマット有無
   */
  preFormatting?: boolean | O;

  /**
   * 移行処理終了後のフォーマット有無
   */
  postFormatting?: boolean | O;

  /**
   * フォーマット時の設定
   * preFormatting,postFormattingがtrueの場合は、この設定を使用してフォーマットを行う
   */
  formatterOptions?: O;

  /**
   * パーサーの自動選択
   */
  autoParserSelection?: boolean;

  /**
   * 拡張子に対するパーサーのマップ
   */
  parserMap?: { [ext: string]: string };
};

/**
 * テキストの置換に関する設定
 */
export type ReplacementConfig<P extends ReplacementValues = ReplacementValues> = ReplacePlaceholdersOptions & {
  /**
   * プレイスホルダーと置き換えられる値
   */
  params?: P;
};

/**
 * ファイルの入出力に関する設定
 */
export type InputOputputConfig = {
  /**
   * テキストファイル読み込み時のエンコーディング
   * 未指定の場合はutf8
   */
  inputEncoding?: BufferEncoding;

  /**
   * テキストファイル書き込み時のエンコーディング
   * 未指定の場合はutf8
   */
  outputEncoding?: BufferEncoding;

  /**
   * バイナリ形式で読み込む場合にtrue
   */
  binary?: boolean;

  /**
   * エラーがあってもファイルを出力する
   */
  forceOutput?: boolean;
};

/**
 * ログに関する設定
 */
export type LogConfig = {
  /**
   * ログを出力しない
   */
  silent?: boolean;
};

/**
 * 動的に変更される文字列
 */
export type VariableString<O extends ReplaceOptions = ReplaceOptions> = string | DynamicPattern<O>;

/**
 * 移行処理で参照する任意のパラメーター
 */
export type MigrationParams = ReplacementValues;

/**
 * 繰り返し処理内で有効なパラメーター
 * _で始まるプロパティはシステム側で自動的に設定するもの
 * それ以外はMigrationConfigのiteratorで返された値
 */
export type IterationParams = MigrationParams & {
  /**
   * ファイルの読み込み元パス
   */
  _inputPath?: string;

  /**
   * ファイルの出力先パス
   */
  _outputPath?: string;
};
