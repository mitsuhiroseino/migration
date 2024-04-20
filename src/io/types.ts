import { ContentType, DiffParams, ItemType, IterationParams } from '../types';
import { IO_TYPE } from './constants';

/**
 * 入出力の種別
 */
export type IoType = (typeof IO_TYPE)[keyof typeof IO_TYPE];

export type IoConfig = {
  /**
   * コピー
   */
  copy?: boolean;
};

/**
 * 入力の共通設定
 */
export type CommonInputConfig = {};

/**
 * ファイルシステムから入力する際の共通設定
 */
export type FsInputConfigBase = CommonInputConfig & {
  /**
   * テキストファイル読み込み時のエンコーディング
   * 未指定の場合は読み込み元のファイルの内容から判断する
   */
  inputEncoding?: string;
};

/**
 * 入力した場合の処理結果
 */
export type CommonInputResult = DiffParams & {
  /**
   * 入力の名称
   */
  inputItem?: string;

  /**
   * 入力要素の種別
   */
  inputItemType?: ItemType;

  /**
   * 入力コンテンツ種別
   */
  inputContentType?: ContentType;
};

/**
 * ファイルシステムから入力した場合の処理結果
 */
export type FsInputResultBase = CommonInputResult & {
  /**
   * 入力のパス
   */
  inputPath: string;

  /**
   * 入力のルートパス
   */
  inputRootPath: string;

  /**
   * 入力のエンコーディング
   */
  inputEncoding?: string;
};

/**
 * 出力の共通設定
 */
export type CommonOutputConfig = {};

/**
 * ファイルシステムへ出力する際の共通設定
 */
export type FsOutputConfigBase = CommonOutputConfig & {
  /**
   * テキストファイル書き込み時のエンコーディング
   * 未指定の場合は読み込み時のエンコーディング
   */
  outputEncoding?: string;
};

/**
 * 出力した場合の処理結果
 */
export type CommonOutputResult = DiffParams & {
  /**
   * 出力の名称
   */
  outputItem?: string;

  /**
   * 出力要素の種別
   */
  outputItemType?: ItemType;

  /**
   * 出力コンテンツ種別
   */
  outputContentType?: ContentType;
};

/**
 * ファイルシステムへ出力した場合の処理結果
 */
export type FsOutputResultBase = CommonOutputResult & {
  /**
   * 出力のパス
   */
  outputPath: string;

  /**
   * 出力のルートパス
   */
  outputRootPath: string;

  /**
   * 出力のエンコーディング
   */
  outputEncoding?: string;
};

/**
 * 入出力関連の共通メソッド
 */
export interface IoBase {
  /**
   * 初期化処理
   * @param params
   */
  initialize(params: IterationParams): Promise<DiffParams>;

  /**
   * 完了処理
   * @param params
   */
  complete(params: IterationParams): Promise<DiffParams>;

  /**
   * 例外処理
   * @param params
   */
  error(params: IterationParams): Promise<DiffParams>;
}
