import { MigrationJobConfig, MigrationJobResult, MigrationTaskConfig, MigrationTaskResult } from '../types';
import applyIf from '../utils/applyIf';
import asArray from '../utils/asArray';
import executeAsyncFunctions from '../utils/executeAsyncFunctions';
import inheritConfig from '../utils/inheritConfig';
import executeJob from './executeJob';

/**
 * 以降の設定に従いファイルの移行を行う
 * @param configs 移行設定
 * @returns
 */
export default async function executeTask(config: MigrationTaskConfig): Promise<MigrationTaskResult> {
  const { taskId, jobs, parallelJobs, onTaskStart, onTaskEnd, disabled, ...rest } = config;
  if (disabled) {
    return {
      results: [],
    };
  }

  applyIf(onTaskStart, [config]);

  const jobFns = [];
  const jobConfigs = asArray(jobs);
  for (const jobConfig of jobConfigs) {
    // ジョブ毎の処理
    const jobCfg: MigrationJobConfig = inheritConfig(jobConfig, rest);
    // ジョブ実行用の関数を作成
    jobFns.push(async () => await executeJob(jobCfg));
  }
  // 設定に従い全タスクを実行
  const results = await executeAsyncFunctions<MigrationJobResult>(jobFns, parallelJobs);
  const result = { results };

  applyIf(onTaskEnd, [result, config]);
  return result;
}
