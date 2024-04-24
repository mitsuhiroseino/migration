import { MigrationIterationConfig, MigrationJobConfig, MigrationJobResult } from '../types';
import applyIf from '../utils/applyIf';
import toOperations from '../utils/toOperations';
import executeIteration from './executeIteration';
import getIterator from './helpers/getIterator';

/**
 * 1処理対象分の処理を行う
 * @param config 移行対象の設定
 * @param params 繰り返し毎のパラメーター
 */
export default async function executeJob(config: MigrationJobConfig): Promise<MigrationJobResult | null> {
  const { jobId, operations, iteration, params: jobParams, onJobStart, onJobEnd, disabled, ...rest } = config;
  if (disabled) {
    return {
      results: [],
    };
  }

  const cfg: MigrationIterationConfig = rest;
  cfg.operations = toOperations(operations, cfg);

  // 対象が存在する場合
  applyIf(onJobStart, [config]);

  // イテレーターを作成する
  const iterator = getIterator(iteration, config);
  // 対象の処理
  const results = [];
  let i = 0;
  for (const iterationParams of iterator) {
    // iteratorの返す値で繰り返し処理
    const iterationCfg = { iterationId: `${jobId}[${i}]`, ...cfg };
    const params = { ...jobParams, ...iterationParams };
    // イテレーション間は直列実行
    results.push(await executeIteration(iterationCfg, params));
    i++;
  }
  const result = { results };

  applyIf(onJobEnd, [result, config]);
  return result;
}
