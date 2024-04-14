import Encoding from 'encoding-japanese';
import fs from 'fs-extra';
import { CONTENT_TYPE } from '../constants';
import { IterationParams } from '../types';
import writeAnyFile from '../utils/writeAnyFile';
import { MIGRATION_ITEM_STATUS } from './constants';
import setSystemParams from './helpers/setSystemParams';
import manageFile from './manageFile';
import operateContent from './operateContent';
import { MigrationItemStatus, MigrationIterationResult, MigrationJobConfig } from './types';

/**
 * ファイルを移行する
 * @param inputPath 移行元のパス
 * @param outputPath 移行先のパス
 * @param config 設定
 * @param params 繰り返し処理毎のパラメーター
 * @param ensured 親ディレクトリが作成済みか
 * @returns 処理結果
 */
export default async function processFile(
  inputPath: string,
  outputPath: string,
  config: MigrationJobConfig,
  params: IterationParams,
  ensured?: boolean,
): Promise<MigrationIterationResult> {
  return manageFile(fileFn, inputPath, outputPath, config, params, ensured);
}

/**
 * ファイルを移行する
 * @param inputPath 移行元のパス
 * @param outputPath 移行先のパス
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
  const { binary, inputEncoding, outputEncoding } = config;
  // ファイルの入力
  const buffer = await fs.readFile(inputPath);
  let encoding: any;
  if (binary) {
    encoding = 'BINARY';
  } else {
    encoding = Encoding.detect(buffer);
  }
  let content;
  let contentType;
  if (!encoding || encoding === 'BINARY') {
    // バイナリファイルの場合
    content = buffer;
    contentType = CONTENT_TYPE.BINARY;
  } else {
    // テキストファイルの場合
    content = buffer.toString(inputEncoding || encoding);
    contentType = CONTENT_TYPE.TEXT;
  }
  // コンテンツの操作
  const newParams = setSystemParams(params, { contentType, content });
  content = await operateContent(content, config, newParams);

  let status;
  if (outputPath != null) {
    // ファイルの出力あり
    await writeAnyFile(outputPath, content, {
      ensured,
      spaces: 2,
      encoding: outputEncoding || encoding,
    });
    status = MIGRATION_ITEM_STATUS.CONVERTED;
  } else {
    // ファイルの出力なし
    status = MIGRATION_ITEM_STATUS.PROCESSED;
  }

  return [status, newParams];
}
