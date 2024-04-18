import isString from 'lodash/isString';
import { IO_TYPE } from '../io';
import { InputConfig, InputFactory } from '../io/inputs';
import { OutputConfig, OutputFactory } from '../io/outputs';
import { IterationParams } from '../types';
import applyIf from '../utils/applyIf';
import propagateError from '../utils/propagateError';
import assignParams from './helpers/assignParams';
import inheritConfig from './helpers/inheritConfig';
import operateContent from './operateContent';
import { MigrationIterationResult, MigrationJobConfig } from './types';

/**
 * 繰り返し処理1回分の処理を行う
 * @param config 移行対象の設定
 * @param params 繰り返し毎のパラメーター
 */
export default async function executeIteration(
  config: MigrationJobConfig,
  params: IterationParams,
): Promise<MigrationIterationResult | null> {
  const { input, output, copy, onIterationStart, onIterationEnd, onItemStart, onItemEnd, ...rest } = config;

  applyIf(onIterationStart, [config, params]);

  // 入力設定取得
  const inputCfg = isString(input) ? { type: IO_TYPE.FILE, inputPath: input } : input || { type: IO_TYPE.NOOP };
  const inputConfig: InputConfig = inheritConfig({ copy, ...inputCfg }, config);
  // 出力設定取得
  const outputCfg = isString(output) ? { type: IO_TYPE.FILE, outputPath: output } : output || { type: IO_TYPE.NOOP };
  const outputConfig: OutputConfig = inheritConfig({ copy, ...outputCfg }, config);

  // コピー可否判定
  if (copy && inputConfig.type !== outputConfig.type) {
    throw new Error('For copies, the IO type must be the same:' + config.jobId);
  }

  // 入力処理
  const inputGenerator = InputFactory.get(inputConfig);
  const inputItems = await inputGenerator(inputConfig, params);
  // 出力処理
  const outputCreater = OutputFactory.get(outputConfig);
  const outputFn = outputCreater(outputConfig);
  // 処理結果
  const iterationResult: MigrationIterationResult = { results: [] };

  try {
    // 入力を回す
    for await (const inputItem of inputItems) {
      let newParams = params;
      try {
        // 入力時の結果をパラメーターにマージ
        newParams = assignParams(newParams, inputItem.result);
        applyIf(onItemStart, [config, newParams]);

        // コンテンツを処理
        const content = await operateContent(inputItem.content, rest, newParams);

        // 出力処理
        const outputItem = await outputFn(content, newParams);
        newParams = assignParams(newParams, outputItem.result);

        // 要素の処理結果
        const result = { ...inputItem.result, ...outputItem.result, status: outputItem.status };
        iterationResult.results.push(result);
        applyIf(onItemEnd, [result, config, newParams]);
      } catch (error) {
        throw propagateError(error, `: ${newParams._inputItem}`);
      }
    }
  } catch (error) {
    throw error;
  }

  applyIf(onIterationEnd, [iterationResult, config, params]);
  return iterationResult;
}
