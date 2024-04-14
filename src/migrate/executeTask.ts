import applyIf from '../utils/applyIf';
import asArray from '../utils/asArray';
import executeAsyncFunctions from '../utils/executeAsyncFunctions';
import executeJob from './executeJob';
import inheritConfig from './helpers/inheritConfig';
import { MigrationJobResult, MigrationTaskConfig, MigrationTaskResult } from './types';

/**
 * 以降の設定に従いファイルの移行を行う
 * @param configs 移行設定
 * @returns
 */
export default async function executeTask(config: MigrationTaskConfig): Promise<MigrationTaskResult> {
  const { jobs, parallelJobs, onTaskStart, onTaskEnd } = config;
  applyIf(onTaskStart, [config]);

  const jobFns = [];
  const jobConfigs = asArray(jobs);
  for (const jobConfig of jobConfigs) {
    // ジョブ毎の処理
    const jobCfg = inheritConfig(jobConfig, config);
    // ジョブ実行用の関数を作成
    jobFns.push(async () => await executeJob(jobCfg));
  }
  // 設定に従い全タスクを実行
  const results = await executeAsyncFunctions<MigrationJobResult>(jobFns, parallelJobs);
  const result = { results };

  applyIf(onTaskEnd, [result, config]);
  return result;
}
