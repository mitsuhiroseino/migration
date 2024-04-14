import { IterationParams } from '../types';
import writeAnyFile from '../utils/writeAnyFile';
import { MIGRATION_ITEM_STATUS } from './constants';
import manageFile from './manageFile';
import operateContent from './operateContent';
import { MigrationItemStatus, MigrationIterationResult, MigrationJobConfig } from './types';

/**
 * 入力の無い処理
 * @param outputPath 出力先のパス
 * @param config 設定
 * @param params 繰り返し処理毎のパラメーター
 * @returns 処理結果
 */
export default async function processNull(
  outputPath: string,
  config: MigrationJobConfig,
  params: IterationParams,
  ensured?: boolean,
): Promise<MigrationIterationResult> {
  return manageFile(fileFn, null, outputPath, config, params, ensured);
}

/**
 * 入力の無い処理
 * @param inputPath null
 * @param outputPath 出力先のパス
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
  const { outputEncoding } = config;

  const content = await operateContent(null, config, params);

  let status;
  if (outputPath != null) {
    // ファイルの出力あり
    await writeAnyFile(outputPath, content, {
      ensured,
      encoding: outputEncoding,
      spaces: 2,
    });
    status = MIGRATION_ITEM_STATUS.CREATED;
  } else {
    // ファイルの出力なし
    status = MIGRATION_ITEM_STATUS.PROCESSED;
  }

  return [status, params];
}
