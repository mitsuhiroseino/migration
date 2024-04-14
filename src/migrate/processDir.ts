import { IterationParams } from '../types';
import { MIGRATION_ITEM_STATUS } from './constants';
import manageDir from './manageDir';
import processFile from './processFile';
import { MigrationIterationResult, MigrationJobConfig } from './types';

/**
 * ディレクトリを移行する
 * @param inputPath 移行元のパス
 * @param outputPath 移行先のパス
 * @param config 設定
 * @param params 繰り返し処理毎のパラメーター
 * @param currentLevel ルートディレクトリからの深さ
 * @param ensured 親ディレクトリが作成済みか
 * @returns
 */
export default async function processDir(
  inputPath: string,
  outputPath: string,
  config: MigrationJobConfig,
  params: IterationParams,
  currentLevel: number = 0,
  ensured?: boolean,
): Promise<MigrationIterationResult> {
  return manageDir(
    processDir,
    processFile,
    MIGRATION_ITEM_STATUS.CONVERTED,
    inputPath,
    outputPath,
    config,
    params,
    currentLevel,
    ensured,
  );
}
