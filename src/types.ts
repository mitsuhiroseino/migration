import { Options } from 'prettier';
import { CONTENT_TYPE, ITEM_TYPE } from './constants';
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
 * フィルタリング可能な入力の設定
 */
export type FilterableConfig<V = any> = {
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
export type IterationParams<
  AP = AssignedParams<{
    /**
     * ファイルの読み込み元パス
     */
    inputPath?: string;

    /**
     * ファイルの出力先パス
     */
    outputPath?: string;
  }>,
> = AP & MigrationParams;

/**
 * 処理内で設定されるパラメーター
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
export type Essential<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;

export type Constructor<T> = new () => T;