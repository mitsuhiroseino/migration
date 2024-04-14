import fs from 'fs-extra';
import { IterationParams } from '../types';
import processDir from './processDir';
import processFile from './processFile';
import { MigrationIterationResult, MigrationJobConfig } from './types';

/**
 * 対象の移行を行う
 * @param inputPath 移行元のパス
 * @param outputPath 移行先のパス
 * @param config 移行の設定
 * @param params 繰り返し処理のパラメーター
 * @returns
 */
export default async function processItem(
  inputPath: string,
  outputPath: string,
  config: MigrationJobConfig,
  params: IterationParams,
): Promise<MigrationIterationResult> {
  const stat = await fs.stat(inputPath);
  if (stat.isDirectory()) {
    // ディレクトリの場合
    return await processDir(inputPath, outputPath, config, params);
  } else if (stat.isFile()) {
    // ファイルの場合
    return await processFile(inputPath, outputPath, config, params);
  }
}
