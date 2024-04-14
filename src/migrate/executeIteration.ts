import fs from 'fs-extra';
import { IterationParams } from '../types';
import applyIf from '../utils/applyIf';
import finishDynamicValue from '../utils/finishDynamicValue';
import propagateError from '../utils/propagateError';
import throwError from '../utils/throwError';
import copyItem from './copyItem';
import createFileFromContent from './createFileFromContent';
import createItem from './createItem';
import setSystemParams from './helpers/setSystemParams';
import processItem from './processItem';
import processNull from './processNull';
import { MigrationIterationResult, MigrationJobConfig } from './types';

/**
 * 繰り返し処理1回文の処理を行う
 * @param config 移行対象の設定
 * @param params 繰り返し毎のパラメーター
 */
export default async function executeIteration(
  config: MigrationJobConfig,
  params: IterationParams,
): Promise<MigrationIterationResult | null> {
  const { inputPath, outputPath, template, templatePath, copy, onIterationStart, onIterationEnd } = config;

  applyIf(onIterationStart, [config, params]);

  const outputFilePath: string = finishDynamicValue(outputPath, params, config);
  let newParams = setSystemParams(params, { outputPath: outputFilePath });
  let result: MigrationIterationResult = null;

  if (inputPath == null && template == null && templatePath == null) {
    // 入力が無い場合
    result = await processNull(outputFilePath, config, newParams);
  } else {
    // 入力が有る場合
    if (template != null) {
      // ファイルを作成
      const content: string = finishDynamicValue(template, newParams, config);
      // テンプレートの場合は事前フォーマットをoffにする
      const cfgs = { ...config, preFormatting: false };
      try {
        result = await createFileFromContent(content, outputFilePath, cfgs, newParams);
      } catch (error) {
        throw propagateError(error, ': tempalate');
      }
    } else if (templatePath != null) {
      // テンプレートファイルを読み込んで生成
      const tplPath: string = finishDynamicValue(templatePath, newParams, config);
      newParams = setSystemParams(newParams, { inputPath: tplPath });
      const availablePath = await fs.exists(tplPath);
      if (availablePath) {
        // テンプレートの場合は事前フォーマットをoffにする
        const cfgs = { ...config, preFormatting: false };
        result = await createItem(tplPath, outputFilePath, cfgs, newParams);
      } else {
        // 処理対象なし
        throwError(`"${tplPath}" does not exist.`, config);
      }
    } else if (inputPath != null) {
      // 移行元を処理
      const inputItemPath: string = finishDynamicValue(inputPath, newParams, config);
      newParams = setSystemParams(newParams, { inputPath: inputItemPath });
      const availablePath = await fs.exists(inputItemPath);
      if (availablePath) {
        if (copy) {
          // コピー
          result = await copyItem(inputItemPath, outputFilePath, config, newParams);
        } else {
          // 移行
          result = await processItem(inputItemPath, outputFilePath, config, newParams);
        }
      } else {
        // 処理対象なし
        throwError(`"${inputItemPath}" does not exist.`, config);
      }
    }
  }
  applyIf(onIterationEnd, [result, config, params]);
  return result;
}
