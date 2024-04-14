import fs from 'fs-extra';
import { IterationParams } from '../types';
import createDir from './createDir';
import createFile from './createFile';
import { MigrationIterationResult, MigrationJobConfig } from './types';

/**
 * テンプレートからディレクトリ、ファイルを作成する
 * @param inputPath テンプレートのパス
 * @param outputPath 出力先のパス
 * @param config 設定
 * @param params 繰り返し処理毎のパラメーター
 * @returns 処理結果
 */
export default async function createItem(
  inputPath: string,
  outputPath: string,
  config: MigrationJobConfig,
  params: IterationParams,
): Promise<MigrationIterationResult> {
  if (outputPath != null) {
    const stat = await fs.stat(inputPath);
    if (stat.isDirectory()) {
      // ディレクトリの場合
      return await createDir(inputPath, outputPath, config, params);
    } else if (stat.isFile()) {
      // ファイルの場合
      return await createFile(inputPath, outputPath, config, params);
    }
  } else {
    // 出力先なし
    throw new Error('Output path does not exist: ' + outputPath);
  }
}
