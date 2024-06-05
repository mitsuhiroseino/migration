import { Attributes, DestroyOptions, FindOptions, Model, ModelStatic, Sequelize, Transaction } from 'sequelize';
import { ReplaceOptions } from 'src/utils/replace';
import { CONTENT_TYPE, ITEM_TYPE } from '../../constants';
import { DiffParams, IterationParams } from '../../types';
import InputBase from '../InputBase';
import InputFactory from '../InputFactory';
import { IO_TYPE } from '../constants';
import { InputGenerator, InputReturnValue } from '../types';
import { DbInputConfig, DbInputResult } from './types';

/**
 * DB入力
 */
class DbInput<M extends Model = Model> extends InputBase<M[], DbInputConfig<M>, DbInputResult<M>> {
  /**
   * Sequelizeのインスタンス
   */
  private _sequelize: Sequelize;

  /**
   * モデル
   */
  private _model: ModelStatic<M>;

  /**
   * トランザクション
   */
  private _transaction: Transaction;

  /**
   * 取得したレコード
   */
  private _records: M[];

  async activate(params: IterationParams): Promise<DiffParams> {
    const { database, username, password, options, modelConfig, beginTransaction, transactionOptions } = this._config;
    // Sequelizeのインスタンス
    const sequelize = new Sequelize(database, username, password, options);
    this._sequelize = sequelize;
    if (beginTransaction) {
      this._transaction = await sequelize.transaction(transactionOptions);
    }

    // ModelStatic
    const { modelName, attributes, options: modelOptions } = modelConfig;
    const model: ModelStatic<M> = sequelize.define(modelName, attributes, modelOptions);
    this._model = model;

    return { sequelize, model, transaction: this._transaction };
  }

  start(params: IterationParams): Promise<DiffParams> {
    this._records = [];
    return Promise.resolve({});
  }

  read(params: IterationParams<any>): AsyncIterableIterator<InputReturnValue<any, DbInputResult<M>>> {
    const { findOptions = {}, pagination } = this._config;
    if (pagination) {
      // ページネーションの場合
      return this._generatePagination(findOptions, params);
    } else {
      // 一括取得の場合
      return this._generateSelectAll(findOptions);
    }
  }

  /**
   * ページネーションのジェネレーター
   * @param findOptions
   * @param params
   */
  private async *_generatePagination(
    findOptions: FindOptions,
    params: IterationParams<{ _limit: number; _offset: number }>,
  ): InputGenerator<M | M[], DbInputResult<M>> {
    const { _limit: limit, _offset: offset } = params;
    const paginationOptions = { ...findOptions, limit, offset };
    const content = await this._model.findAll(paginationOptions);

    if (this._config.single) {
      // 1件ずつ返す場合
      yield* this._asSingle(content);
    } else {
      // 複数件まとめて返す場合
      this._records = content;
      yield {
        content,
        result: {
          ...this._getResult(),
          limit,
          offset: offset + limit,
        },
      };
    }
  }

  /**
   * 一括取得のジェネレーター
   * @param findOptions
   */
  private async *_generateSelectAll(findOptions: FindOptions): InputGenerator<M | M[], DbInputResult<M>> {
    const content = await this._model.findAll(findOptions);

    if (this._config.single) {
      // 1件ずつ返す場合
      yield* this._asSingle(content);
    } else {
      // 複数件まとめて返す場合
      this._records = content;
      yield {
        content,
        result: this._getResult(),
      };
    }
  }

  /**
   * 1件ずつ返す
   * @param records
   */
  private async *_asSingle(records: M[]): InputGenerator<M, DbInputResult<M>> {
    for (const record of records) {
      this._records = [record];
      yield {
        content: record,
        result: this._getResult(),
      };
    }
  }

  /**
   * 処理結果を取得
   * @returns
   */
  private _getResult(): DbInputResult<M> {
    const model = this._model;
    return {
      sequelize: this._sequelize,
      model,
      inputItem: model.name,
      inputItemType: ITEM_TYPE.NODE,
      inputContentType: CONTENT_TYPE.DATA,
    };
  }

  copy(params: IterationParams): AsyncIterableIterator<InputReturnValue<M[], DbInputResult<M>>> {
    throw new Error('Cannot use copy in DB');
  }

  move(params: IterationParams): AsyncIterableIterator<InputReturnValue<M[], DbInputResult<M>>> {
    throw new Error('Cannot use copy in DB');
  }

  async delete(params: IterationParams): Promise<DiffParams> {
    const records = this._records;
    const promises = [];
    for (const record of records) {
      promises.push(record.destroy());
    }
    await Promise.all(promises);
    return { sequelize: this._sequelize, records };
  }

  async deactivate(params: IterationParams): Promise<DiffParams> {
    const transaction = this._transaction;
    if (transaction) {
      await transaction.commit();
    }
    await this._sequelize.close();
    return {};
  }

  async error(params: IterationParams): Promise<DiffParams> {
    const transaction = this._transaction;
    if (transaction) {
      await transaction.rollback();
    }
    await this._sequelize.close();
    return {};
  }
}
InputFactory.register(IO_TYPE.DATA, DbInput);
export default DbInput;
