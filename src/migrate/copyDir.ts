import { IterationParams } from '../types';
import { MIGRATION_ITEM_STATUS } from './constants';
import copyFile from './copyFile';
import manageDir from './manageDir';
import { MigrationIterationResult, MigrationJobConfig } from './types';

/**
 * 対象の移行を行う
 * @param inputPath コピー元のパス
 * @param outputPath コピー先のパス
 * @param config 設定
 * @param params 繰り返し処理毎のパラメーター
 * @param currentLevel ルートディレクトリからの深さ
 * @param ensured 親ディレクトリが作成済みか
 * @returns 処理結果
 */
export default async function copyDir(
  inputPath: string,
  outputPath: string,
  config: MigrationJobConfig,
  params: IterationParams,
  currentLevel: number = 0,
  ensured?: boolean,
): Promise<MigrationIterationResult> {
  return manageDir(
    copyDir,
    copyFile,
    MIGRATION_ITEM_STATUS.COPIED,
    inputPath,
    outputPath,
    config,
    params,
    currentLevel,
    ensured,
  );
}
