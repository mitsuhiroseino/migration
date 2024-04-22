import { MIGRATION_STATUS } from '../constants';
import Context from '../utils/Context';
import asArray from '../utils/asArray';
import executeAsyncFunctions from '../utils/executeAsyncFunctions';
import inheritConfig from '../utils/inheritConfig';
import executeTask from './executeTask';
import assignDefaultConfig from './helpers/assignDefaultConfig';
import registerPlugins from './helpers/registerPlugins';
import { MigrationConfig, MigrationResult, MigrationTaskConfig, MigrationTaskResult } from './types';

/**
 * 移行の設定に従いテキストファイルの移行を行う
 * @param config 移行設定
 * @returns
 */
export default async function migrate<C extends MigrationConfig>(config: C): Promise<MigrationResult> {
  const running = Context.get(migrate) || 0;
  Context.set(migrate, running + 1);

  const taskFns: (() => Promise<MigrationTaskResult>)[] = [];

  const cfg = assignDefaultConfig(config);
  const { plugins, tasks } = cfg;
  // プラグインの有効化
  registerPlugins(plugins);

  // タスク処理の開始
  for (const task of asArray(tasks)) {
    const taskConfig: MigrationTaskConfig = inheritConfig(task, cfg);
    // タスク実行用の関数を作成
    taskFns.push(async () => await executeTask(taskConfig));
  }
  // 設定に従い全タスクを実行
  const results = await executeAsyncFunctions(taskFns, config.parallelTasks);

  const current = Context.get(migrate);
  if (current === 1) {
    Context.clear();
  }
  return {
    results,
    status: MIGRATION_STATUS.SUCCESS,
  };
}
