import { MIGRATION_STATUS, MIGRATION_STATUS_PRIORITY } from '../constants';
import { MigrationIterationConfig, MigrationJobConfig, MigrationJobResult } from '../types';
import applyIf from '../utils/applyIf';
import toOperations from '../utils/toOperations';
import updateStatus from '../utils/updateStatus';
import executeIteration from './executeIteration';
import getIterator from './helpers/getIterator';

/**
 * 1処理対象分の処理を行う
 * @param config 移行対象の設定
 * @param params 繰り返し毎のパラメーター
 */
export default async function executeJob(config: MigrationJobConfig): Promise<MigrationJobResult | null> {
  const { jobId, operations, iteration, params: jobParams, onJobStart, onJobEnd, disabled, ...rest } = config;
  const result: MigrationJobResult = { status: MIGRATION_STATUS.SUCCESS, results: [] };
  if (disabled) {
    result.status = MIGRATION_STATUS.DISABLED;
    return result;
  }

  const cfg: MigrationIterationConfig = rest;
  cfg.operations = toOperations(operations, cfg);

  // 対象が存在する場合
  applyIf(onJobStart, [config]);

  // イテレーターを作成する
  const iterator = getIterator(iteration, config);
  // 対象の処理
  let i = 0;
  for (const iterationParams of iterator) {
    // iteratorの返す値で繰り返し処理
    const iterationCfg = { iterationId: `${jobId}[${i}]`, ...cfg };
    const params = { ...jobParams, ...iterationParams };
    // イテレーション間は直列実行
    const iterationResult = await executeIteration(iterationCfg, params);
    result.results.push(iterationResult);
    result.status = updateStatus(result.status, iterationResult.status, MIGRATION_STATUS_PRIORITY);
    i++;
  }

  applyIf(onJobEnd, [result, config]);
  return result;
}
