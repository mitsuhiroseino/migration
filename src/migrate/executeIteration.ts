import { MANIPULATION_TYPE } from '../constants';
import { InputConfig, OutputConfig } from '../io';
import IoHandler, { IoHandlerConfig } from '../io/IoHandler';
import getIoConfig from '../io/helpers/getIoConfig';
import { IterationParams, MigrationIterationConfig, MigrationIterationResult } from '../types';
import applyIf from '../utils/applyIf';
import assignParams from '../utils/assignParams';
import inheritConfig from '../utils/inheritConfig';
import propagateError from '../utils/propagateError';
import operateContent from './operateContent';

/**
 * 繰り返し処理1回分の処理を行う
 * @param config 移行対象の設定
 * @param params 繰り返し毎のパラメーター
 */
export default async function executeIteration(
  config: MigrationIterationConfig,
  params: IterationParams,
): Promise<MigrationIterationResult | null> {
  const {
    iterationId,
    input,
    output,
    manipulationType,
    onIterationStart,
    onIterationEnd,
    onItemStart,
    onItemEnd,
    disabled,
    ...rest
  } = config;
  if (disabled) {
    return {
      results: [],
    };
  }

  applyIf(onIterationStart, [config, params]);

  // 入力設定取得
  const inputCfg = getIoConfig(input, 'inputPath');
  const inputConfig: InputConfig = inheritConfig(inputCfg, rest);
  // 出力設定取得
  const outputCfg = getIoConfig(output, 'outputPath');
  const outputConfig: OutputConfig = inheritConfig(outputCfg, rest);
  // 入出力ハンドラー
  const ioHandlerConfig: IoHandlerConfig = inheritConfig({ manipulationType }, rest);
  const ioHandler = new IoHandler(inputConfig, outputConfig, ioHandlerConfig);
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
        const content = await operateContent(inputItem.content, rest, newParams);

        // 出力処理
        const outputItem = await ioHandler.write(content, newParams);
        newParams = assignParams(newParams, outputItem.result);

        // 入力を削除
        let deletedItem;
        if (manipulationType === MANIPULATION_TYPE.DELETE) {
          deletedItem = await ioHandler.delete(newParams);
          newParams = assignParams(newParams, deletedItem);
        }

        // 要素の処理結果
        const result = { ...inputItem.result, ...outputItem.result, ...deletedItem, status: outputItem.status };
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
