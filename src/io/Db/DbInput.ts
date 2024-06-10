import { FindOptions, Model, ModelStatic, Sequelize, Transaction } from 'sequelize';
import { CONTENT_TYPE, ITEM_TYPE } from '../../constants';
import { DiffParams } from '../../types';
import asArray from '../../utils/asArray';
import InputBase from '../InputBase';
import InputFactory from '../InputFactory';
import { IO_TYPE } from '../constants';
import { InputGenerator, InputReturnValue } from '../types';
import { DbAssignedParams, DbInputConfig, DbInputResult } from './types';

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

  protected async _activate(params: DbAssignedParams): Promise<DiffParams> {
    const { database, username, password, options, modelConfig, beginTransaction, transactionOptions, dryRun } =
      this._config;
    // Sequelizeのインスタンス
    const sequelize = new Sequelize(database, username, password, options);
    this._sequelize = sequelize;
    if (!dryRun && beginTransaction) {
      this._transaction = await sequelize.transaction(transactionOptions);
    }

    // ModelStatic
    const { modelName, attributes, options: modelOptions } = modelConfig;
    const model: ModelStatic<M> = sequelize.define(modelName, attributes, modelOptions);
    this._model = model;

    return {
      inputItem: model.name,
      inputItemType: ITEM_TYPE.LEAF,
      inputContentType: CONTENT_TYPE.DATA,
      inputSequelize: sequelize,
      inputModel: model,
      inputTransaction: this._transaction,
    };
  }

  protected _read(params: DbAssignedParams): AsyncIterableIterator<InputReturnValue<any, DbInputResult<M>>> {
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
    params: DbAssignedParams,
  ): InputGenerator<M | M[], DbInputResult<M>> {
    const { _inputLimit: limit, _inputOffset: offset } = params;
    const paginationOptions = { ...findOptions, limit, offset };
    const records = await this._model.findAll(paginationOptions);

    if (this._config.single) {
      // 1件ずつ返す場合
      yield* this._asSingle(records);
    } else {
      // 複数件まとめて返す場合
      yield {
        content: records,
        result: {
          inputLimit: limit,
          inputOffset: offset + limit,
        },
      };
    }
  }

  /**
   * 一括取得のジェネレーター
   * @param findOptions
   */
  private async *_generateSelectAll(findOptions: FindOptions): InputGenerator<M | M[], DbInputResult<M>> {
    const records = await this._model.findAll(findOptions);

    if (this._config.single) {
      // 1件ずつ返す場合
      yield* this._asSingle(records);
    } else {
      // 複数件まとめて返す場合
      yield {
        content: records,
        result: {},
      };
    }
  }

  /**
   * 1件ずつ返す
   * @param records
   */
  private async *_asSingle(records: M[]): InputGenerator<M, DbInputResult<M>> {
    for (const record of records) {
      yield {
        content: record,
        result: {},
      };
    }
  }

  protected _copy(params: DbAssignedParams): AsyncIterableIterator<InputReturnValue<M[], DbInputResult<M>>> {
    throw new Error('Cannot use copy in DB');
  }

  protected _move(params: DbAssignedParams): AsyncIterableIterator<InputReturnValue<M[], DbInputResult<M>>> {
    throw new Error('Cannot use copy in DB');
  }

  protected async _delete(content: M | M[], params: DbAssignedParams): Promise<void> {
    const records = asArray(content);
    const promises = [];
    for (const record of records) {
      promises.push(record.destroy());
    }
    await Promise.all(promises);
  }

  protected _getDeleteResult(content: M | M[], params: DbAssignedParams): DiffParams {
    return { records: asArray(content) };
  }

  protected async _deactivate(params: DbAssignedParams): Promise<DiffParams> {
    const transaction = this._transaction;
    if (transaction) {
      await transaction.commit();
    }
    await this._sequelize.close();
    this._cleanup();
    return {};
  }

  protected async _error(params: DbAssignedParams): Promise<DiffParams> {
    const transaction = this._transaction;
    if (transaction) {
      await transaction.rollback();
    }
    await this._sequelize.close();
    this._cleanup();
    return {};
  }

  private _cleanup() {
    this._sequelize = null;
    this._transaction = null;
    this._model = null;
  }
}
InputFactory.register(IO_TYPE.DATA, DbInput);
export default DbInput;
