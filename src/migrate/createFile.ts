import fs from 'fs-extra';
import { IterationParams } from '../types';
import finishDynamicValue from '../utils/finishDynamicValue';
import { DEFAULT_TEXT_ENCODING } from './constants';
import createFileFromContent from './createFileFromContent';
import manageFile from './manageFile';
import { MigrationItemStatus, MigrationIterationResult, MigrationJobConfig } from './types';

/**
 * テンプレートファイルからファイルを作成する
 * @param inputPath テンプレートのパス
 * @param outputPath 出力先のパス
 * @param config 設定
 * @param params 繰り返し処理毎のパラメーター
 * @param ensured 親ディレクトリが作成済みか
 * @returns 処理結果
 */
export default async function createFile(
  inputPath: string,
  outputPath: string,
  config: MigrationJobConfig,
  params: IterationParams,
  ensured?: boolean,
): Promise<MigrationIterationResult> {
  return manageFile(fileFn, inputPath, outputPath, config, params, ensured);
}

/**
 * テンプレートファイルからファイルを作成する
 * @param inputPath テンプレートのパス
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
  const { onFileStart, onFileEnd, filter, ...rest } = config;
  // テンプレートの読み込み
  const template = await fs.readFile(inputPath, { encoding: config.inputEncoding || DEFAULT_TEXT_ENCODING });
  const content: string = finishDynamicValue(template, params, config);
  // コンテンツへの処理
  const contentResult = await createFileFromContent(content, outputPath, rest, params, ensured);

  return [contentResult.status, params];
}
