import {
  CommonConfig,
  CommonDevelopmentConfig,
  CommonInputConfig,
  CommonLogConfig,
  CommonOutputConfig,
  CommonReplacementConfig,
  Content,
  ContentType,
  DiffParams,
  ItemType,
  IterationParams,
  MigrationItemSpecificConfig,
  MigrationItemStatus,
  OperationResult,
} from '../types';
import { FactoriableConfig } from '../utils/Factory';
import { IO_TYPE } from './constants';

export { default as InputConfig } from './InputConfig';
export { default as OutputConfig } from './OutputConfig';

/**
 * 入出力の種別
 */
export type IoType = (typeof IO_TYPE)[keyof typeof IO_TYPE];

/**
 * 入出力の設定
 */
export type IoConfigBase<T = IoType> = CommonReplacementConfig &
  CommonDevelopmentConfig &
  CommonLogConfig &
  FactoriableConfig<T>;

/**
 * 入出力関連の共通メソッド
 */
export interface Io {
  /**
   * 開始処理
   * @param params
   */
  activate(params: IterationParams): Promise<DiffParams | void>;

  /**
   * 繰り返し毎の開始処理
   * @param params
   */
  start(params: IterationParams): Promise<DiffParams | void>;

  /**
   * 繰り返し毎の終了処理
   * @param params
   */
  end(params: IterationParams): Promise<DiffParams | void>;

  /**
   * 完了処理
   * @param params
   */
  deactivate(params: IterationParams): Promise<DiffParams | void>;

  /**
   * 例外処理
   * @param params
   */
  error(params: IterationParams): Promise<DiffParams | void>;
}

/**
 * 入力の設定
 */
export type InputConfigBase<T = IoType> = CommonInputConfig &
  IoConfigBase<T> & {
    /**
     * 入力ID
     */
    inputId?: string;
  };

/**
 * 入力した場合の処理結果
 */
export type InputResultBase = DiffParams & {
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

  /**
   * 入力のエンコーディング
   */
  inputEncoding?: string;
};

/**
 * パスでリソースの場所を表す入力した場合の処理結果
 */
export type PathInputResultBase = InputResultBase & {
  /**
   * 入力のパス
   */
  inputItemPath?: string;

  /**
   * 入力のルートパス
   */
  inputRootPath?: string;
};

/**
 * 入力処理結果
 */
export type InputReturnValue<C extends Content, R extends InputResultBase> = {
  /**
   * 1入力分の処理ステータス
   */
  status: MigrationItemStatus;

  /**
   * 読み込んだコンテンツ
   */
  content?: C;

  /**
   * 処理に関する情報
   */
  result?: R;
};

/**
 * 入力用イテレーターを生成するジェネレーター
 */
export type InputGenerator<C extends Content, R extends InputResultBase = InputResultBase> = AsyncGenerator<
  InputReturnValue<C, R>
>;

/**
 * コンテンツの入力元
 */
export interface Input<C extends Content, IR extends InputResultBase = InputResultBase> extends Io {
  /**
   * コンテンツの入力
   */
  read(params: IterationParams): AsyncIterableIterator<InputReturnValue<C, IR>>;

  /**
   * コンテンツのコピー
   * コンテンツ自体は読み込まず、コンテンツのコピーに必要な情報のみを返す
   * 入出力のタイプが同じ場合にのみ動作する
   */
  copy(params: IterationParams): AsyncIterableIterator<InputReturnValue<C, IR>>;

  /**
   * コンテンツの移動
   * コンテンツ自体は読み込まず、コンテンツの移動に必要な情報のみを返す
   * 入出力のタイプが同じ場合にのみ動作する
   */
  move(params: IterationParams): AsyncIterableIterator<InputReturnValue<C, IR>>;

  /**
   * コンテンツの削除
   */
  delete(content: C, params: IterationParams): Promise<DiffParams | void>;

  /**
   * 実行の後処理
   */
  complete(params: IterationParams): Promise<DiffParams | void>;
}

/**
 * 出力の設定
 */
export type OutputConfigBase<T = IoType> = CommonOutputConfig &
  IoConfigBase<T> & {
    /**
     * 出力ID
     */
    outputId?: string;
  };

/**
 * 出力した場合の処理結果
 */
export type OutputResultBase = DiffParams & {
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

  /**
   * 出力のエンコーディング
   */
  outputEncoding?: string;
};

/**
 * パスでリソースの場所を表す出力をした場合の処理結果
 */
export type PathOutputResultBase = OutputResultBase & {
  /**
   * 出力のパス
   */
  outputItemPath?: string;

  /**
   * 出力先の親ディレクトリのパス
   */
  outputParentPath?: string;

  /**
   * 出力のルートパス
   */
  outputRootPath?: string;
};

/**
 * 出力処理結果
 */
export type OutputReturnValue<R extends DiffParams> = {
  /**
   * 1出力分の処理ステータス
   */
  status: MigrationItemStatus;

  /**
   * 処理に関する情報
   */
  result?: R;
};

/**
 * コンテンツの出力先
 */
export interface Output<C extends Content, OR extends OutputResultBase = OutputResultBase> extends Io {
  /**
   * 実行の前処理
   */
  prepare(params: IterationParams): Promise<DiffParams | void>;

  /**
   * コンテンツの出力
   * @param config
   * @param params
   * @returns
   */
  write(content: C, params: IterationParams): Promise<OutputReturnValue<OR>>;

  /**
   * コンテンツのコピー
   * コンテンツの内容は含まず、コンテンツのコピーに必要な情報のみを受け取る
   * 入出力のタイプが同じ場合にのみ動作する
   * @param params
   */
  copy(params: IterationParams): Promise<OutputReturnValue<OR>>;

  /**
   * コンテンツの移動
   * コンテンツの内容は含まず、コンテンツの移動に必要な情報のみを受け取る
   * 入出力のタイプが同じ場合にのみ動作する
   * @param params
   */
  move(params: IterationParams): Promise<OutputReturnValue<OR>>;
}

/**
 * コンテンツを操作する関数
 */
export type ContentOperator = <C>(content: C, params: IterationParams) => Promise<OperationResult<C>>;

/**
 * 入出力の設定
 */
export type IoHandlerConfig = CommonConfig &
  MigrationItemSpecificConfig & {
    /**
     * 読み込んだコンテンツへの処理を行う関数
     * @param content
     * @param params
     * @returns
     */
    operationFn?: ContentOperator;
  };

/**
 * 入出力処理時のオプション
 */
export type HandleOptions = HandleIoOptions & {
  /**
   * 読み込んだコンテンツへの処理を行う関数
   * @param content
   * @param params
   * @returns
   */
  operationFn?: ContentOperator;
};

/**
 * 入出力処理のオプション
 */
export type HandleIoOptions = {
  /**
   * 入力処理
   */
  input?: Input<any, any>;

  /**
   * 出力処理
   */
  output?: Output<any, any>;
};
