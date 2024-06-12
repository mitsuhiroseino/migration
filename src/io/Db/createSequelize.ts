import { Model, Sequelize } from 'sequelize';
import { DbConfigBase } from './types';

export default function createSequelize<M extends Model = any>(config: DbConfigBase<M>) {
  const { uri, database, username, password, options } = config;

  if (uri != null) {
    return new Sequelize(uri);
  } else if (database != null && username != null && password != null) {
    return new Sequelize(database, username, password, options);
  } else {
    return new Sequelize(options);
  }
}
