import {
  Attributes,
  BulkCreateOptions,
  FindOptions,
  Model,
  ModelAttributes,
  ModelOptions,
  ModelStatic,
  Options,
  SaveOptions,
  Sequelize,
  Transaction,
  TransactionOptions,
} from 'sequelize';
import { AssignedParams, IterationParams } from '../../types';
import { IO_TYPE } from '../constants';
import { InputConfigBase, InputResultBase, OutputConfigBase, OutputResultBase } from '../types';

/**
 * DB入力の設定
 */
export type DbInputConfig<M extends Model = any> = InputConfigBase<typeof IO_TYPE.DB> &
  DbConfigBase<M> & {
    /**
     * トランザクションを使用する
     */
    beginTransaction?: boolean;

    /**
     * 検索オプション
     */
    findOptions?: FindOptions<Attributes<M>>;

    /**
     * 繰り返し検索を行う
     * trueの場合は、findOptionsのlimitとoffsetが必須
     */
    pagination?: boolean;

    /**
     * 1件ずつ読み込む
     */
    single?: boolean;
  };

/**
 * DB入力時の処理結果
 */
export type DbInputResult<M extends Model = any> = InputResultBase & {
  /**
   * Sequelizeのインスタンス
   */
  inputSequelize?: Sequelize;

  /**
   * モデルクラス
   */
  inputModel?: ModelStatic<M>;

  /**
   * トランザクション
   */
  inputTransaction?: Transaction;

  /**
   * 取得レコード数
   */
  inputLimit?: number;

  /**
   * 取得位置
   */
  inputOffset?: number;
};

/**
 * DB出力の設定
 */
export type DbOutputConfig<M extends Model = any> = OutputConfigBase<typeof IO_TYPE.DB> &
  DbConfigBase<M> & {
    /**
     * コネクションを入力と共有する
     * trueの場合、出力に設定されたコネクション関連の設定は無効
     */
    shareConnection?: boolean;

    /**
     * モデルを入力と共有する
     * trueの場合、出力に設定されたモデル関連の設定は無効
     */
    shareModel?: boolean;

    /**
     * 新規追加
     */
    create?: boolean;

    /**
     * 新規追加オプション
     */
    createOptions?: BulkCreateOptions<Attributes<M>>;

    /**
     * 更新オプション
     */
    updateOptions?: SaveOptions<M>;
  };

/**
 * DB入力時の処理結果
 */
export type DbOutputResult<M extends Model = any> = OutputResultBase & {
  /**
   * Sequelizeのインスタンス
   */
  outputSequelize?: Sequelize;

  /**
   * モデルクラス
   */
  outputModel?: ModelStatic<M>;

  /**
   * トランザクション
   */
  outputTransaction?: Transaction;
};

/**
 * DB設定のベース
 */
export type DbConfigBase<M extends Model = any> = {
  /**
   * データベースの種別
   */
  dbType: string;

  /**
   * データベース接続文字列
   */
  database: string;

  /**
   * ユーザー名
   */
  username: string;

  /**
   * パスワード
   */
  password?: string;

  /**
   * オプション
   */
  options?: Options;

  /**
   * モデルの設定
   */
  modelConfig: ModelConfig<M>;

  /**
   * トランザクションのオプション
   */
  transactionOptions?: TransactionOptions;
};

/**
 * モデルの設定
 */
export type ModelConfig<M extends Model, TAttributes = Attributes<M>> = {
  /**
   * モデル名
   */
  modelName: string;

  /**
   * 属性
   */
  attributes: ModelAttributes<M, TAttributes>;

  /**
   * オプション
   */
  options?: ModelOptions<M>;
};

export type DbAssignedParams = AssignedParams<Partial<DbInputResult> & Partial<DbOutputResult>> & IterationParams & {};
