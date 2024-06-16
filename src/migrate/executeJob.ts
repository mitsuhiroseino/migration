import { MIGRATION_STATUS, MIGRATION_STATUS_PRIORITY } from '../constants';
import { MigrationIterationConfig, MigrationIterationResult, MigrationJobConfig, MigrationJobResult } from '../types';
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
  const {
    jobId,
    operations,
    iteration,
    params: jobParams,
    onJobStart,
    onJobEnd,
    onJobError,
    disabled,
    ...rest
  } = config;

  try {
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
      let iterationResult: MigrationIterationResult;
      try {
        // イテレーション間は直列実行
        iterationResult = await executeIteration(iterationCfg, params);
      } catch (error) {
        throw error;
      }
      result.results.push(iterationResult);
      result.status = updateStatus(result.status, iterationResult.status, MIGRATION_STATUS_PRIORITY);
      if (iterationResult.isBroken) {
        // executeIterationがbreakした場合は繰り替えし処理を抜ける
        break;
      }
      i++;
    }

    applyIf(onJobEnd, [result, config]);
    return result;
  } catch (error) {
    applyIf(onJobError, [error, config]);
    throw error;
  }
}
