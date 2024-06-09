import { Model, ModelStatic, Sequelize, Transaction } from 'sequelize';
import { CONTENT_TYPE, ITEM_TYPE, MIGRATION_ITEM_STATUS } from '../../constants';
import { Content, DiffParams, IterationParams } from '../../types';
import asArray from '../../utils/asArray';
import OutputBase from '../OutputBase';
import OutputFactory from '../OutputFactory';
import { IO_TYPE } from '../constants';
import { OutputResultBase, OutputReturnValue } from '../types';
import { DbAssignedParams, DbOutputConfig, DbOutputResult } from './types';

/**
 * DB出力
 */
class DbOutput<M extends Model = Model> extends OutputBase<Content, DbOutputConfig, DbOutputResult> {
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
    const {
      database,
      username,
      password,
      options,
      modelConfig,
      transactionOptions,
      shareConnection,
      shareModel,
      dryRun,
    } = this._config;

    let sequelize: Sequelize;
    let transaction: Transaction;
    if (shareConnection) {
      sequelize = params._inputSequelize as Sequelize;
      transaction = params._inputTransaction as Transaction;
    } else {
      // Sequelizeのインスタンス
      sequelize = new Sequelize(database, username, password, options);
      if (!dryRun) {
        transaction = await sequelize.transaction(transactionOptions);
      }
    }

    let model: ModelStatic<M>;
    if (shareModel) {
      model = params._inputModel as ModelStatic<M>;
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

  protected async _write(content: any, params: DbAssignedParams): Promise<void> {
    const records = asArray(content);
    const { create, createOptions, updateOptions } = this._config;
    if (create) {
      await this._model.bulkCreate(records, { ...createOptions, transaction: this._transaction });
    } else {
      for (const record of records) {
        await record.save({ ...updateOptions, transaction: this._transaction });
      }
    }
  }

  protected _getWriteResult(params: IterationParams): OutputReturnValue<DbOutputResult> {
    return this._config.create
      ? { result: {}, status: MIGRATION_ITEM_STATUS.CREATED }
      : { result: {}, status: MIGRATION_ITEM_STATUS.CONVERTED };
  }

  protected async _copy(params: DbAssignedParams): Promise<void> {
    throw new Error('Cannot use copy in DB');
  }

  protected async _move(params: DbAssignedParams): Promise<void> {
    throw new Error('Cannot use move in DB');
  }

  protected async _deactivate(params: DbAssignedParams): Promise<DiffParams> {
    if (!this._config.shareConnection) {
      const transaction = this._transaction;
      if (transaction) {
        await transaction.commit();
      }
      await this._sequelize.close();
    }
    return {};
  }

  protected async _error(params: DbAssignedParams): Promise<DiffParams> {
    if (!this._config.shareConnection) {
      const transaction = this._transaction;
      if (transaction) {
        await transaction.rollback();
      }
      await this._sequelize.close();
    }
    return {};
  }
}

OutputFactory.register(IO_TYPE.DB, DbOutput);
export default DbOutput;
