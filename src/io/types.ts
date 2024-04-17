import { ContentType, ItemType } from '../types';

export type CommonInputConfig = {
  /**
   * コピー
   * trueの場合、Inputはcontentを返さない
   */
  copy?: boolean;
};

/**
 * ファイルシステムから入力する際の共通設定
 */
export type FsInputConfig = CommonInputConfig & {
  /**
   * テキストファイル読み込み時のエンコーディング
   * 未指定の場合はutf8
   */
  inputEncoding?: BufferEncoding;

  /**
   * バイナリ形式で入力する場合にtrue
   */
  inputBinary?: boolean;
};

/**
 * 入力した場合の処理結果
 */
export type CommonInputResult = {
  /**
   * 入力要素の種別
   */
  inputItemType?: ItemType;

  /**
   * 入力の名称
   */
  inputItem?: string;

  /**
   * 入力コンテンツ種別
   */
  inputContentType?: ContentType;
};

/**
 * ファイルシステムから入力した場合の処理結果
 */
export type FsInputResult = CommonInputResult & {
  /**
   * 入力のパス
   */
  inputPath?: string;

  /**
   * 入力の親ディレクトリのパス
   */
  inputParentPath?: string;

  /**
   * 入力のルートパスからの相対パス
   */
  inputParentRelativePath: string;

  /**
   * 入力のルートパス
   */
  inputRootPath?: string;

  /**
   * 入力がテキストの場合のエンコーディング
   */
  inputEncoding?: BufferEncoding;

  /**
   * 出力時に新規作成になるもの
   */
  isNew?: boolean;
};

export type CommonOutputConfig = {
  /**
   * コピー
   * trueの場合、Outputはcontentを受け取らない
   */
  copy?: boolean;
};

/**
 * ファイルシステムへ出力する際の共通設定
 */
export type FsOutputConfig = CommonOutputConfig & {
  /**
   * テキストファイル書き込み時のエンコーディング
   * 未指定の場合はutf8
   */
  outputEncoding?: BufferEncoding;

  /**
   * バイナリ形式で出力する場合にtrue
   */
  outputBinary?: boolean;
};

/**
 * 出力した場合の処理結果
 */
export type CommonOutputResult = {
  /**
   * 出力要素の種別
   */
  outputItemType?: ItemType;

  /**
   * 出力の名称
   */
  outputItem?: string;

  /**
   * 出力コンテンツ種別
   */
  outputContentType?: ContentType;
};

/**
 * ファイルシステムへ出力した場合の処理結果
 */
export type FsOutputResult = CommonOutputResult & {
  /**
   * 出力のパス
   */
  outputPath?: string;

  /**
   * 出力の親ディレクトリのパス
   */
  outputParentPath?: string;

  /**
   * 出力のルートパスからの相対パス
   */
  outputParentRelativePath?: string;

  /**
   * 出力のルートパス
   */
  outputRootPath?: string;

  /**
   * 出力がテキストの場合のエンコーディング
   */
  outputEncoding?: BufferEncoding;
};
