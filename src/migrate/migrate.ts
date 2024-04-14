import { MIGRATION_STATUS } from '../constants';
import asArray from '../utils/asArray';
import executeAsyncFunctions from '../utils/executeAsyncFunctions';
import executeTask from './executeTask';
import assignDefaultConfig from './helpers/assignDefaultConfig';
import inheritConfig from './helpers/inheritConfig';
import { MigrationConfig, MigrationResult, MigrationStatus, MigrationTaskResult } from './types';

/**
 * 移行の設定に従いテキストファイルの移行を行う
 * @param config 移行設定
 * @returns
 */
export default async function migrate<C extends MigrationConfig>(config: C): Promise<MigrationResult> {
  const taskFns: (() => Promise<MigrationTaskResult>)[] = [];

  const cfg = assignDefaultConfig(config);
  const { tasks } = cfg;
  for (const task of asArray(tasks)) {
    const taskConfig = inheritConfig(task, cfg);
    // タスク実行用の関数を作成
    taskFns.push(async () => await executeTask(taskConfig));
  }
  // 設定に従い全タスクを実行
  const results = await executeAsyncFunctions(taskFns, config.parallelTasks);

  return {
    results,
    status: MIGRATION_STATUS.SUCCESS,
  };
}
