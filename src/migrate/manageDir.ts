import fs from 'fs-extra';
import path from 'path';
import { IterationParams } from '../types';
import applyIf from '../utils/applyIf';
import isMatch from '../utils/isMatch';
import propagateError from '../utils/propagateError';
import replaceWithConfigs from '../utils/replaceWithConfigs';
import { MIGRATION_ITEM_STATUS } from './constants';
import setSystemParams from './helpers/setSystemParams';
import { MigrationItemStatus, MigrationIterationResult, MigrationJobConfig } from './types';

type ManageDirFn = (
  inputPath: string,
  outputPath: string,
  config: MigrationJobConfig,
  params: IterationParams,
  currentLevel: number,
  ensured?: boolean,
) => Promise<MigrationIterationResult>;

type ManageFileFn = (
  inputPath: string,
  outputPath: string,
  config: MigrationJobConfig,
  params: IterationParams,
  ensured?: boolean,
) => Promise<MigrationIterationResult>;

/**
 * ディレクトリに対する処理の基盤
 * @param manageDirFn ディレクトリを処理する関数
 * @param manageFileFn ファイルを処理する関数
 * @param completedStatus 完了時のステータス
 * @param inputPath 入力のパス
 * @param outputPath 出力のパス
 * @param config 設定
 * @param params 繰り返し処理毎のパラメーター
 * @param currentLevel ルートディレクトリからの深さ
 * @param ensured 親ディレクトリが作成済みか
 * @returns 処理結果
 */
export default async function manageDir(
  manageDirFn: ManageDirFn,
  manageFileFn: ManageFileFn,
  completedStatus: MigrationItemStatus,
  inputPath: string,
  outputPath: string,
  config: MigrationJobConfig,
  params: IterationParams,
  currentLevel: number = 0,
  ensured?: boolean,
): Promise<MigrationIterationResult> {
  // ディレクトリの場合は配下のファイル・ディレクトリを順次処理
  const itemType = 'dir';
  const newParams = setSystemParams(params, { itemType, inputPath, outputPath });
  const { onDirStart, onDirEnd, ignoreSubDir, filter, itemName } = config;
  const result: MigrationIterationResult = {
    itemType,
    inputPath,
    outputPath,
    status: MIGRATION_ITEM_STATUS.PENDING,
  };

  if (!ignoreSubDir || currentLevel === 0) {
    // サブディレクトリ以下も処理 or 現在処理しているのが対象ディレクトリ直下の場合
    const processTarget = isMatch(inputPath, filter, newParams);
    if (processTarget) {
      // 処理対象の場合
      try {
        applyIf(onDirStart, [config, newParams]);
        if (outputPath != null && !ensured) {
          await fs.ensureDir(outputPath);
        }
      } catch (error) {
        throw propagateError(error, inputPath);
      }

      let items;

      try {
        items = await fs.readdir(inputPath, { withFileTypes: true });
      } catch (error) {
        throw propagateError(error, inputPath);
      }

      const promises = [];
      for (const item of items) {
        let inputItemPath, outputItemPath, newItemParams;
        try {
          inputItemPath = path.join(inputPath, item.name);
          newItemParams = setSystemParams(newParams, { inputItemPath, inputItem: item.name });
          let outputItem;
          if (itemName) {
            outputItem = replaceWithConfigs(item.name, itemName, newItemParams);
          } else {
            outputItem = item.name;
          }

          outputItemPath = outputPath != null ? path.join(outputPath, outputItem) : null;
          newItemParams = setSystemParams(newItemParams, { outputItemPath, outputItem });
        } catch (error) {
          throw propagateError(error, inputPath);
        }

        // 子要素で発生した例外はキャッチしない
        if (item.isDirectory()) {
          if (!ignoreSubDir) {
            // サブディレクトリも処理する
            promises.push(manageDirFn(inputItemPath, outputItemPath, config, newItemParams, currentLevel + 1));
          }
        } else {
          promises.push(manageFileFn(inputItemPath, outputItemPath, config, newItemParams, true));
        }
      }

      await Promise.all(promises);

      result.status = completedStatus;
      try {
        applyIf(onDirEnd, [result, config, newParams]);
      } catch (error) {
        throw propagateError(error, inputPath);
      }
    } else {
      // 処理対象外
      result.status = MIGRATION_ITEM_STATUS.SKIPPED;
    }
  } else {
    // 処理対象外
    result.status = MIGRATION_ITEM_STATUS.SKIPPED;
  }

  return result;
}
