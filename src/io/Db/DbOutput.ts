import { Model, ModelStatic, Sequelize, Transaction } from 'sequelize';
import { MIGRATION_ITEM_STATUS } from '../../constants';
import { Content, DiffParams, IterationParams } from '../../types';
import asArray from '../../utils/asArray';
import OutputBase from '../OutputBase';
import OutputFactory from '../OutputFactory';
import { IO_TYPE } from '../constants';
import { OutputResultBase, OutputReturnValue } from '../types';
import { DbOutputConfig, DbOutputResult } from './types';

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

  async activate(params: IterationParams): Promise<DiffParams> {
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
      sequelize = params._sequelize as Sequelize;
      transaction = params._transaction as Transaction;
    } else {
      // Sequelizeのインスタンス
      sequelize = new Sequelize(database, username, password, options);
      if (!dryRun) {
        transaction = await sequelize.transaction(transactionOptions);
      }
    }

    let model: ModelStatic<M>;
    if (shareModel) {
      model = params._model as ModelStatic<M>;
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
    return {};
  }

  async write(content: any, params: IterationParams): Promise<OutputReturnValue<OutputResultBase>> {
    const records = asArray(content);
    const { create, createOptions, updateOptions } = this._config;
    if (create) {
      if (!this._config.dryRun) {
        await this._model.bulkCreate(records, { ...createOptions, transaction: this._transaction });
      }
      return {
        result: {},
        status: MIGRATION_ITEM_STATUS.CREATED,
      };
    } else {
      if (!this._config.dryRun) {
        for (const record of records) {
          await record.save({ ...updateOptions, transaction: this._transaction });
        }
      }
      return {
        result: {},
        status: MIGRATION_ITEM_STATUS.CONVERTED,
      };
    }
  }

  async copy(params: IterationParams): Promise<OutputReturnValue<OutputResultBase>> {
    throw new Error('Cannot use copy in DB');
  }

  async move(params: IterationParams): Promise<OutputReturnValue<OutputResultBase>> {
    throw new Error('Cannot use move in DB');
  }

  async deactivate(params: IterationParams): Promise<DiffParams> {
    if (!this._config.shareConnection) {
      const transaction = this._transaction;
      if (transaction) {
        await transaction.commit();
      }
      await this._sequelize.close();
    }
    return {};
  }

  async error(params: IterationParams): Promise<DiffParams> {
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
