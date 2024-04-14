import fs from 'fs-extra';
import path from 'path';
import { IterationParams } from '../types';
import { MIGRATION_ITEM_STATUS } from './constants';
import manageFile from './manageFile';
import { MigrationItemStatus, MigrationIterationResult, MigrationJobConfig } from './types';

/**
 * ファイルをコピーする
 * @param inputPath コピー元のパス
 * @param outputPath コピー先のパス
 * @param config 設定
 * @param params 繰り返し処理毎のパラメーター
 * @param ensured 親ディレクトリが作成済みか
 * @returns 処理結果
 */
export default async function copyFile(
  inputPath: string,
  outputPath: string,
  config: MigrationJobConfig,
  params: IterationParams,
  ensured?: boolean,
): Promise<MigrationIterationResult> {
  return manageFile(fileFn, inputPath, outputPath, config, params, ensured);
}

/**
 * ファイルをコピーする
 * @param inputPath コピー元のパス
 * @param outputPath コピー先のパス
 * @param config 設定
 * @param params 繰り返し処理毎のパラメーター
 * @param ensured 親ディレクトリが作成済みか
 * @returns 処理結果
 */
async function fileFn(
  inputPath: string,
  outputPath: string,
  config: MigrationJobConfig,
  params: IterationParams,
  ensured?: boolean,
): Promise<[MigrationItemStatus, IterationParams]> {
  // 出力先の確保
  if (!ensured) {
    const parentPath = path.dirname(outputPath);
    await fs.ensureDir(parentPath);
  }
  // ファイルのコピー
  await fs.copyFile(inputPath, outputPath);

  return [MIGRATION_ITEM_STATUS.COPIED, params];
}
