import { MIGRATION_STATUS, MIGRATION_STATUS_PRIORITY } from '../constants';
import { MigrationConfig, MigrationResult, MigrationTaskConfig, MigrationTaskResult } from '../types';
import applyIf from '../utils/applyIf';
import asArray from '../utils/asArray';
import executeAsyncFunctions from '../utils/executeAsyncFunctions';
import inheritConfig from '../utils/inheritConfig';
import updateStatus from '../utils/updateStatus';
import executeTask from './executeTask';
import assignDefaultConfig from './helpers/assignDefaultConfig';
import registerPlugins from './helpers/registerPlugins';

/**
 * 移行の設定に従いテキストファイルの移行を行う
 * @param config 移行設定
 * @returns
 */
export default async function migrate<C extends MigrationConfig = MigrationConfig>(
  config: C,
): Promise<MigrationResult> {
  const result: MigrationResult = { status: MIGRATION_STATUS.SUCCESS, results: [] };
  const taskFns: (() => Promise<MigrationTaskResult>)[] = [];

  const cfg = assignDefaultConfig(config);
  const { id, plugins, tasks, parallelTasks, disabled, onError, ...rest } = cfg;
  if (disabled) {
    result.status = MIGRATION_STATUS.DISABLED;
    return result;
  }

  try {
    // プラグインの有効化
    registerPlugins(plugins);

    // タスク処理の開始
    for (const task of asArray(tasks)) {
      const taskConfig: MigrationTaskConfig = inheritConfig(task, rest);
      // タスク実行用の関数を作成
      taskFns.push(async () => await executeTask(taskConfig));
    }
    // 設定に従い全タスクを実行
    const taskResults = await executeAsyncFunctions(taskFns, parallelTasks);
    for (const taskResult of taskResults) {
      result.results.push(taskResult);
      result.status = updateStatus(result.status, taskResult.status, MIGRATION_STATUS_PRIORITY);
    }

    return result;
  } catch (error) {
    applyIf(onError, [error, config]);
  }
}
