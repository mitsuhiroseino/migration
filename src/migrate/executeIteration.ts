import { INHERITED_IO_CONFIGS, INHERITED_OPERATE_CONTENT_CONFIGS, MIGRATION_STATUS } from '../constants';
import { ContentOperator, IoHandler, IoHandlerConfig } from '../io';
import { Content, IterationConfig, IterationParams, MigrationIterationResult, OperateContentConfig } from '../types';
import applyIf from '../utils/applyIf';
import inheritConfig from '../utils/inheritConfig';
import operateContent from './operateContent';

// 操作関数の取得
const getOperate = (operateEach: boolean, operateContentConfig: OperateContentConfig): ContentOperator =>
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
  config: IterationConfig,
  params: IterationParams,
): Promise<MigrationIterationResult | null> {
  const {
    iterationId,
    operateEach,
    onIterationStart,
    onIterationEnd,
    onIterationError,
    disabled,
    operations = [],
    ...rest
  } = config;

  try {
    let result: MigrationIterationResult = { status: MIGRATION_STATUS.SUCCESS, results: [] };
    if (disabled) {
      result.status = MIGRATION_STATUS.DISABLED;
      return result;
    }

    applyIf(onIterationStart, [config, params]);

    // オペレーション実行関数の取得
    const operationFn = getOperate(operateEach, inheritConfig({ operations }, rest, INHERITED_OPERATE_CONTENT_CONFIGS));
    // 入出力ハンドラー
    const ioHandlerConfig: IoHandlerConfig = inheritConfig({ operationFn }, rest, INHERITED_IO_CONFIGS);
    const ioHandler = new IoHandler(ioHandlerConfig);

    // オペレーションの前処理
    await Promise.all(operations.map((operation) => operation.initialize(params)));
    // 入出力処理
    result = await ioHandler.handle(params);
    // オペレーションの後処理
    await Promise.all(operations.map((operation) => operation.finalize(params)));
    applyIf(onIterationEnd, [result, config, params]);

    return result;
  } catch (error) {
    // オペレーションのエラー処理
    await Promise.all(operations.map((operation) => operation.error(params)));
    applyIf(onIterationError, [error, config, params]);
    throw error;
  }
}
