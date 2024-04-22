import isString from 'lodash/isString';
import { IO_TYPE, InputConfig, OutputConfig } from '../io';
import IoHandler from '../io/IoHandler';
import { Operation } from '../operate';
import { IterationParams } from '../types';
import applyIf from '../utils/applyIf';
import assignParams from '../utils/assignParams';
import inheritConfig from '../utils/inheritConfig';
import propagateError from '../utils/propagateError';
import operateContent from './operateContent';
import { MigrationIterationResult, MigrationJobConfig } from './types';

const getIoConfig = (config, pathParam) =>
  isString(config) ? { type: IO_TYPE.FS, [pathParam]: config } : config || { type: IO_TYPE.NOOP };

/**
 * 繰り返し処理1回分の処理を行う
 * @param config 移行対象の設定
 * @param params 繰り返し毎のパラメーター
 */
export default async function executeIteration(
  config: MigrationJobConfig,
  params: IterationParams,
  operations: Operation<any>[],
): Promise<MigrationIterationResult | null> {
  const { input, output, copy, onIterationStart, onIterationEnd, onItemStart, onItemEnd, ...rest } = config;

  applyIf(onIterationStart, [config, params]);

  // 入力設定取得
  const inputCfg = getIoConfig(input, 'inputPath');
  const inputConfig: InputConfig = inheritConfig(inputCfg, config);
  // 出力設定取得
  const outputCfg = getIoConfig(output, 'outputPath');
  const outputConfig: OutputConfig = inheritConfig(outputCfg, config);
  // 入出力ハンドラー
  const ioHandler = new IoHandler(inputConfig, outputConfig, { copy });
  // 処理結果
  const iterationResult: MigrationIterationResult = { results: [] };

  try {
    await ioHandler.initialize(params);
    // 入力を回す
    const inputItems = ioHandler.read(params);
    for await (const inputItem of inputItems) {
      let newParams = params;
      try {
        // 入力時の結果をパラメーターにマージ
        newParams = assignParams(newParams, inputItem.result);
        applyIf(onItemStart, [config, newParams]);

        // コンテンツを処理
        const content = await operateContent(inputItem.content, rest, newParams, operations);

        // 出力処理
        const outputItem = await ioHandler.write(content, newParams);
        newParams = assignParams(newParams, outputItem.result);

        // 要素の処理結果
        const result = { ...inputItem.result, ...outputItem.result, status: outputItem.status };
        iterationResult.results.push(result);
        applyIf(onItemEnd, [result, config, newParams]);
      } catch (error) {
        await ioHandler.error(newParams);
        throw propagateError(error, `: ${newParams._inputItem}`);
      }
    }
    await ioHandler.complete(params);
  } catch (error) {
    await ioHandler.error(params);
    throw error;
  }

  applyIf(onIterationEnd, [iterationResult, config, params]);
  return iterationResult;
}
