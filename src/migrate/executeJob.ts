import applyIf from '../utils/applyIf';
import asArray from '../utils/asArray';
import executeIteration from './executeIteration';
import getIterator from './helpers/getIterator';
import inheritConfig from './helpers/inheritConfig';
import { MigrationJobConfig, MigrationJobResult } from './types';

/**
 * 1処理対象分の処理を行う
 * @param config 移行対象の設定
 * @param params 繰り返し毎のパラメーター
 */
export default async function executeJob(config: MigrationJobConfig): Promise<MigrationJobResult | null> {
  const cfg = { ...config };
  // jobsの設定をoperationの設定に反映
  cfg.operations = asArray(cfg.operations).map((operation) => inheritConfig(operation, config));
  const { iteration, params: jobParams, onJobStart, onJobEnd } = cfg;

  // 対象が存在する場合
  applyIf(onJobStart, [cfg]);

  // イテレーターを作成する
  const iterator = getIterator(iteration, cfg);
  // 対象の処理
  const results = [];
  for (const iterationParams of iterator) {
    // iteratorの返す値で繰り返し処理
    const params = { ...jobParams, ...iterationParams };
    // イテレーション間は直列実行
    results.push(await executeIteration(cfg, params));
  }
  const result = { results };

  applyIf(onJobEnd, [result, cfg]);
  return result;
}
