import { HANDLING_TYPE, MIGRATION_ITEM_STATUS, MIGRATION_STATUS } from '../constants';
import { InputConfig, OutputConfig } from '../io';
import IoHandler, { IoHandlerConfig } from '../io/IoHandler';
import {
  Content,
  IterationParams,
  MigrationItemResult,
  MigrationIterationConfig,
  MigrationIterationResult,
  OperateContentConfig,
} from '../types';
import applyIf from '../utils/applyIf';
import assignParams from '../utils/assignParams';
import getIoConfig from '../utils/getIoConfig';
import inheritConfig from '../utils/inheritConfig';
import propagateError from '../utils/propagateError';
import operateContent from './operateContent';

// 操作関数の取得
const getOperate = (operateEach: boolean, operateContentConfig: OperateContentConfig) =>
  operateEach
    ? // コンテンツが配列の場合は要素に対して操作を行う場合
      async (content: Content, params: IterationParams) => {
        if (Array.isArray(content)) {
          // 配列の場合
          const result: Content = [];
          for (const item of content) {
            try {
              const operatedItem = await operateContent(item, operateContentConfig, params);
              result.push(operatedItem);
            } catch (error) {
              throw error;
            }
          }
          return result;
        } else {
          // 配列ではない場合
          return await operateContent(content, operateContentConfig, params);
        }
      }
    : // 常にコンテンツに対して操作を行う場合
      async (content: Content, params: IterationParams) => await operateContent(content, operateContentConfig, params);

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
    handlingType,
    operateEach,
    onIterationStart,
    onIterationEnd,
    onItemStart,
    onItemEnd,
    onError,
    disabled,
    operations = [],
    ...rest
  } = config;
  const result: MigrationIterationResult = { status: MIGRATION_STATUS.SUCCESS, results: [] };
  if (disabled) {
    result.status = MIGRATION_STATUS.DISABLED;
    return result;
  }
  const cfg = { ...rest, onError };

  applyIf(onIterationStart, [config, params]);

  // 入力設定取得
  const inputConfig: InputConfig = getIoConfig(input);
  // 出力設定取得
  const outputConfig: OutputConfig = getIoConfig(output, true);
  // 入出力ハンドラー
  const ioHandlerConfig: IoHandlerConfig = inheritConfig({ handlingType }, cfg);
  const ioHandler = new IoHandler(inputConfig, outputConfig, ioHandlerConfig);

  // オペレーションの前処理
  await Promise.all(operations.map((operation) => operation.initialize(params)));

  // オペレーション実行関数の取得
  const operate = getOperate(operateEach, { ...cfg, operations });

  try {
    // アクティベーション
    await ioHandler.activate(params);
    // イテレーターを取得
    const inputIterator = ioHandler.read(params);
    // 入力を回す
    while (true) {
      let newParams = params;
      try {
        // 前処理
        const startResult = await ioHandler.start(params);
        newParams = assignParams(newParams, startResult);

        const next = await inputIterator.next();

        if (next.done) {
          // イテレーターが終わった時はbreak
          break;
        }
        const inputItem = next.value;

        // 入力時の結果をパラメーターにマージ
        newParams = assignParams(newParams, inputItem.result);
        applyIf(onItemStart, [config, newParams]);

        // コンテンツを処理
        const operationResult = await operate(inputItem.content, newParams);

        // 出力処理
        const outputItem = await ioHandler.write(operationResult.content, newParams);
        newParams = assignParams(newParams, outputItem.result);

        // 入力を削除
        let deletedItem;
        if (handlingType === HANDLING_TYPE.DELETE) {
          deletedItem = await ioHandler.delete(newParams);
          newParams = assignParams(newParams, deletedItem);
        }

        // 要素の処理結果
        const itemResult: MigrationItemResult = {
          ...inputItem.result,
          ...outputItem.result,
          ...deletedItem,
          status: outputItem.status,
          operationStatus: operationResult.operationStatus,
        };
        result.results.push(itemResult);
        if (itemResult.status === MIGRATION_ITEM_STATUS.ERROR) {
          result.status = MIGRATION_STATUS.ERROR;
        }

        // 後処理
        const endResult = await ioHandler.end(params);
        newParams = assignParams(newParams, endResult);

        applyIf(onItemEnd, [itemResult, config, newParams]);
      } catch (error) {
        // エラー処理
        await ioHandler.error(newParams);
        applyIf(onError, [error, config, params]);
        throw propagateError(error, `${newParams._inputItem}`);
      }
    }
    // ディアクティベーション
    await ioHandler.deactivate(params);
  } catch (error) {
    // エラー処理
    await ioHandler.error(params);
    throw error;
  }

  // オペレーションの後処理
  await Promise.all(operations.map((operation) => operation.finalize(params)));
  applyIf(onIterationEnd, [result, config, params]);

  return result;
}
