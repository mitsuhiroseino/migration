import { Model, ModelStatic, Sequelize, Transaction } from 'sequelize';
import { CONTENT_TYPE, ITEM_TYPE, MIGRATION_ITEM_STATUS } from '../../constants';
import { DiffParams, IterationParams } from '../../types';
import asArray from '../../utils/asArray';
import OutputBase from '../OutputBase';
import OutputFactory from '../OutputFactory';
import { IO_TYPE } from '../constants';
import { OutputReturnValue } from '../types';
import createSequelize from './createSequelize';
import { DbAssignedParams, DbOutputConfig, DbOutputResult } from './types';

/**
 * DB出力
 */
class DbOutput<M extends Model = Model> extends OutputBase<M[], DbOutputConfig<M>, DbOutputResult<M>> {
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
    const { modelConfig, transactionOptions, shareConnection, shareModel, dryRun } = this._config;
    const { _inputSequelize, _inputTransaction, _inputModel } = params;

    let sequelize: Sequelize;
    let transaction: Transaction;
    if (shareConnection) {
      sequelize = _inputSequelize;
      transaction = _inputTransaction;
    } else {
      // Sequelizeのインスタンス
      sequelize = createSequelize(this._config);
      if (!dryRun) {
        transaction = await sequelize.transaction(transactionOptions);
      }
    }

    let model: ModelStatic<M>;
    if (shareModel) {
      model = _inputModel as ModelStatic<M>;
    } else {
      // ModelStatic
      const { modelName, attributes, options: modelOptions } = modelConfig;
      model = sequelize.define(modelName, attributes, modelOptions);
    }

    this._sequelize = sequelize;
    if (!dryRun) {
      this._transaction = transaction;
    }
    this._model = model;
    return {
      outputItem: model.name,
      outputItemType: ITEM_TYPE.LEAF,
      outputContentType: CONTENT_TYPE.DATA,
      outputSequelize: sequelize,
      outputModel: model,
      outputTransaction: this._transaction,
    };
  }

  protected async _write(content: M | M[], params: DbAssignedParams): Promise<void> {
    const records = asArray(content);
    const { create, createOptions, updateOptions } = this._config;
    if (create) {
      await this._model.bulkCreate(
        records.map((record) => record.dataValues),
        { ...createOptions, transaction: this._transaction },
      );
    } else {
      const promises: Promise<M>[] = [];
      for (const record of records) {
        promises.push(record.save({ ...updateOptions, transaction: this._transaction }));
      }
      await Promise.all(promises);
    }
  }

  protected _getWriteResult(content: M | M[], params: IterationParams): OutputReturnValue<DbOutputResult> {
    return this._handleNoContent(
      content,
      params,
      this._config.create ? MIGRATION_ITEM_STATUS.CREATED : MIGRATION_ITEM_STATUS.CONVERTED,
    );
  }

  protected async _copy(params: DbAssignedParams): Promise<void> {
    throw new Error('Cannot use copy in DB');
  }

  protected async _move(params: DbAssignedParams): Promise<void> {
    throw new Error('Cannot use move in DB');
  }

  protected async _deactivate(params: DbAssignedParams): Promise<void> {
    if (!this._config.shareConnection) {
      const transaction = this._transaction;
      if (transaction) {
        await transaction.commit();
      }
      await this._sequelize.close();
    }
    this._cleanup();
  }

  protected async _error(params: DbAssignedParams): Promise<void> {
    if (!this._config.shareConnection) {
      const transaction = this._transaction;
      if (transaction) {
        await transaction.rollback();
      }
      await this._sequelize.close();
    }
    this._cleanup();
  }

  private _cleanup() {
    this._sequelize = null;
    this._transaction = null;
    this._model = null;
  }
}

OutputFactory.register(IO_TYPE.DB, DbOutput);
export default DbOutput;
