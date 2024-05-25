import { MIGRATION_STATUS, MIGRATION_STATUS_PRIORITY } from '../constants';
import { MigrationJobConfig, MigrationJobResult, MigrationTaskConfig, MigrationTaskResult } from '../types';
import applyIf from '../utils/applyIf';
import asArray from '../utils/asArray';
import executeAsyncFunctions from '../utils/executeAsyncFunctions';
import inheritConfig from '../utils/inheritConfig';
import updateStatus from '../utils/updateStatus';
import executeJob from './executeJob';

/**
 * 以降の設定に従いファイルの移行を行う
 * @param configs 移行設定
 * @returns
 */
export default async function executeTask(config: MigrationTaskConfig): Promise<MigrationTaskResult> {
  const { taskId, jobs, parallelJobs, onTaskStart, onTaskEnd, disabled, ...rest } = config;
  const result: MigrationTaskResult = { status: MIGRATION_STATUS.SUCCESS, results: [] };
  if (disabled) {
    result.status = MIGRATION_STATUS.DISABLED;
    return result;
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
  const jobResults = await executeAsyncFunctions<MigrationJobResult>(jobFns, parallelJobs);
  for (const jobResult of jobResults) {
    result.results.push(jobResult);
    result.status = updateStatus(result.status, jobResult.status, MIGRATION_STATUS_PRIORITY);
  }

  applyIf(onTaskEnd, [result, config]);
  return result;
}
