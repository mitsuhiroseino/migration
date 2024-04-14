import { IterationParams } from '../types';
import applyIf from '../utils/applyIf';
import isMatch from '../utils/isMatch';
import writeAnyFile from '../utils/writeAnyFile';
import { DEFAULT_TEXT_ENCODING, MIGRATION_ITEM_STATUS } from './constants';
import setSystemParams from './helpers/setSystemParams';
import operateContent from './operateContent';
import { MigrationIterationResult, MigrationJobConfig } from './types';

/**
 * テンプレートからファイルを作成する
 * @param content テンプレート
 * @param outputPath 出力先のパス
 * @param config 設定
 * @param params 繰り返し処理毎のパラメーター
 * @returns 処理結果
 */
export default async function createFileFromContent(
  content: string,
  outputPath: string,
  config: MigrationJobConfig,
  params: IterationParams,
  ensured?: boolean,
): Promise<MigrationIterationResult> {
  const itemType = 'file';
  const newParams = setSystemParams(params, { itemType, outputPath, content });
  const { onFileStart, onFileEnd, filter } = config;
  const result: MigrationIterationResult = { itemType, outputPath, status: MIGRATION_ITEM_STATUS.PENDING };

  const processTarget = isMatch(content, filter, newParams);
  if (processTarget) {
    applyIf(onFileStart, [config, newParams]);

    // 操作
    content = (await operateContent(content, config, newParams)) as string;

    if (outputPath != null) {
      // ファイルの出力あり
      const { outputEncoding = DEFAULT_TEXT_ENCODING } = config;
      await writeAnyFile(outputPath, content, {
        ensured,
        encoding: outputEncoding,
        spaces: 2,
      });
      result.status = MIGRATION_ITEM_STATUS.CREATED;
    } else {
      // ファイルの出力なし
      result.status = MIGRATION_ITEM_STATUS.PROCESSED;
    }

    applyIf(onFileEnd, [result, config, newParams]);
  } else {
    result.status = MIGRATION_ITEM_STATUS.SKIPPED;
  }
  return result;
}
