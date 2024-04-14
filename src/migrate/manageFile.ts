import { IterationParams } from '../types';
import applyIf from '../utils/applyIf';
import isMatch from '../utils/isMatch';
import propagateError from '../utils/propagateError';
import { MIGRATION_ITEM_STATUS } from './constants';
import setSystemParams from './helpers/setSystemParams';
import { MigrationItemStatus, MigrationIterationResult, MigrationJobConfig } from './types';

type FileFn = (
  inputPath: string,
  outputPath: string,
  config: MigrationJobConfig,
  params: IterationParams,
  ensured?: boolean,
) => Promise<[MigrationItemStatus, IterationParams]>;

/**
 * ファイルを処理する
 * @param inputPath 入力のパス
 * @param outputPath 出力のパス
 * @param config 設定
 * @param params 繰り返し処理毎のパラメーター
 * @param ensured 親ディレクトリが作成済みか
 * @returns 処理結果
 */
export default async function manageFile(
  fileFn: FileFn,
  inputPath: string,
  outputPath: string,
  config: MigrationJobConfig,
  params: IterationParams,
  ensured?: boolean,
): Promise<MigrationIterationResult> {
  const itemType = 'file';
  const newParams = setSystemParams(params, { itemType, inputPath, outputPath });
  const { onFileStart, onFileEnd, filter } = config;
  let result: MigrationIterationResult = {
    itemType,
    inputPath,
    outputPath,
    status: MIGRATION_ITEM_STATUS.PENDING,
  };

  try {
    const processTarget = isMatch(inputPath, filter, newParams);
    if (processTarget) {
      applyIf(onFileStart, [config, params]);
      const [status, latestParams] = await fileFn(inputPath, outputPath, config, newParams, ensured);
      result.status = status;
      applyIf(onFileEnd, [result, config, latestParams]);
    } else {
      result.status = MIGRATION_ITEM_STATUS.SKIPPED;
    }
  } catch (error) {
    throw propagateError(error, inputPath);
  }

  return result;
}
