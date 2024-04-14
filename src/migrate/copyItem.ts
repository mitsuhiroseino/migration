import fs from 'fs-extra';
import { IterationParams } from '../types';
import copyDir from './copyDir';
import copyFile from './copyFile';
import { MigrationIterationResult, MigrationJobConfig } from './types';

/**
 * 対象のコピーを行う
 * @param inputPath コピー元のパス
 * @param outputPath コピー先のパス
 * @param config 設定
 * @param params 繰り返し処理毎のパラメーター
 * @returns 処理結果
 */
export default async function copyItem(
  inputPath: string,
  outputPath: string,
  config: MigrationJobConfig,
  params: IterationParams,
): Promise<MigrationIterationResult> {
  if (outputPath != null) {
    const stat = await fs.stat(inputPath);
    if (stat.isDirectory()) {
      // ディレクトリの場合
      return await copyDir(inputPath, outputPath, config, params);
    } else if (stat.isFile()) {
      // ファイルの場合
      return await copyFile(inputPath, outputPath, config, params);
    }
  } else {
    // 出力先なし
    throw new Error('Output path does not exist: ' + outputPath);
  }
}
