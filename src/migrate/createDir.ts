import { IterationParams } from '../types';
import { MIGRATION_ITEM_STATUS } from './constants';
import createFile from './createFile';
import manageDir from './manageDir';
import { MigrationIterationResult, MigrationJobConfig } from './types';

/**
 * テンプレートテンプレートファイルから作成するファイルを置くディレクトリを作成する
 * @param inputPath テンプレートのパス
 * @param outputPath 出力先のパス
 * @param config 設定
 * @param params 繰り返し処理毎のパラメーター
 * @param currentLevel ルートディレクトリからの深さ
 * @param ensured 親ディレクトリが作成済みか
 * @returns 処理結果
 */
export default async function createDir(
  inputPath: string,
  outputPath: string,
  config: MigrationJobConfig,
  params: IterationParams,
  currentLevel: number = 0,
  ensured?: boolean,
): Promise<MigrationIterationResult> {
  return manageDir(
    createDir,
    createFile,
    MIGRATION_ITEM_STATUS.CREATED,
    inputPath,
    outputPath,
    config,
    params,
    currentLevel,
    ensured,
  );
}
