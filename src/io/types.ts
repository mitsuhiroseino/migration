import {
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
  MigrationItemStatus,
} from '../types';
import { FactoriableConfig } from '../utils/Factory';
import { IO_TYPE } from './constants';

export { default as InputConfig } from './inputs/InputConfig';
export { default as OutputConfig } from './outputs/OutputConfig';

/**
 * 入出力の種別
 */
export type IoType = (typeof IO_TYPE)[keyof typeof IO_TYPE];

/**
 * 入出力関連の共通メソッド
 */
export interface IoBase {
  /**
   * 開始処理
   * @param params
   */
  activate(params: IterationParams): Promise<DiffParams>;

  /**
   * 完了処理
   * @param params
   */
  deactivate(params: IterationParams): Promise<DiffParams>;

  /**
   * 例外処理
   * @param params
   */
  error(params: IterationParams): Promise<DiffParams>;
}

/**
 * 入力の設定
 */
export type InputConfigBase<T = IoType> = CommonInputConfig &
  CommonReplacementConfig &
  CommonDevelopmentConfig &
  CommonLogConfig &
  FactoriableConfig<T> & {
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
  inputPath: string;

  /**
   * 入力のルートパス
   */
  inputRootPath: string;
};

/**
 * 入力処理結果
 */
export type InputReturnValue<C extends Content, R extends InputResultBase> = {
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
export interface Input<C extends Content, IR extends InputResultBase = InputResultBase> extends IoBase {
  /**
   * コンテンツの入力
   */
  read(params: IterationParams): AsyncIterable<InputReturnValue<C, IR>>;

  /**
   * コンテンツのコピー
   * コンテンツ自体は読み込まず、コンテンツのコピーに必要な情報のみを返す
   * 入出力のタイプが同じ場合にのみ動作する
   */
  copy(params: IterationParams): AsyncIterable<InputReturnValue<C, IR>>;

  /**
   * コンテンツの移動
   * コンテンツ自体は読み込まず、コンテンツの移動に必要な情報のみを返す
   * 入出力のタイプが同じ場合にのみ動作する
   */
  move(params: IterationParams): AsyncIterable<InputReturnValue<C, IR>>;

  /**
   * コンテンツの削除
   */
  delete(params: IterationParams): Promise<DiffParams>;
}

/**
 * 出力の設定
 */
export type OutputConfigBase<T = IoType> = CommonOutputConfig &
  CommonReplacementConfig &
  CommonDevelopmentConfig &
  CommonLogConfig &
  FactoriableConfig<T> & {
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
  outputPath: string;

  /**
   * 出力のルートパス
   */
  outputRootPath: string;
};

/**
 * 出力処理結果
 */
export type OutputReturnValue<R extends DiffParams> = {
  status: MigrationItemStatus;

  /**
   * 処理に関する情報
   */
  result?: R;
};

/**
 * コンテンツの出力先
 */
export interface Output<C extends Content, OR extends OutputResultBase = OutputResultBase> extends IoBase {
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
