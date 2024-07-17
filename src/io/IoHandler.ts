import isString from 'lodash/isString';
import {
  HANDLING_TYPE,
  INHERITED_INPUT_CONFIGS,
  INHERITED_OUTPUT_CONFIGS,
  ITEM_TYPE,
  MIGRATION_ITEM_STATUS,
  MIGRATION_STATUS,
  OPERATION_STATUS,
} from '../constants';
import {
  AssignedParams,
  DiffParams,
  IterationParams,
  MigrationItemResult,
  MigrationIterationResult,
  OperationResult,
} from '../types';
import applyIf from '../utils/applyIf';
import assignParams from '../utils/assignParams';
import inheritConfig from '../utils/inheritConfig';
import propagateError from '../utils/propagateError';
import InputFactory from './InputFactory';
import OutputFactory from './OutputFactory';
import { IO_TYPE } from './constants';
import {
  ContentOperator,
  HandleIoOptions,
  HandleOptions,
  Input,
  InputConfig,
  InputResultBase,
  InputReturnValue,
  IoHandlerConfig,
  Output,
  OutputConfig,
  OutputResultBase,
  OutputReturnValue,
} from './types';

/**
 * 入力と出力を操作するクラス
 */
export default class IoHandler {
  /**
   * 設定
   */
  private _config: IoHandlerConfig;

  /**
   * 入力処理
   */
  private _input: Input<any, any>;

  /**
   * 出力処理
   */
  private _output: Output<any, any>;

  /**
   * コンテンツに対する操作関数
   */
  private _operationFn: ContentOperator;

  /**
   * コンストラクター
   * @param inputConfig 入力設定
   * @param outputConfig 出力設定
   * @param config 入出力設定
   */
  constructor(config: IoHandlerConfig) {
    const {
      input,
      output,
      operationFn = <C>(content: C, params: IterationParams) =>
        Promise.resolve({ content, operationStatus: OPERATION_STATUS.UNPROCESSED }),
    } = config;
    // 入力設定取得
    const inputConfig: InputConfig = inheritConfig(getIoConfig(input), config, INHERITED_INPUT_CONFIGS);
    // 出力設定取得
    const outputConfig: OutputConfig = inheritConfig(getIoConfig(output, true), config, INHERITED_OUTPUT_CONFIGS);
    // 入出力操作のチェック
    const { handlingType } = config;
    if (inputConfig.type !== outputConfig.type) {
      if (handlingType === HANDLING_TYPE.COPY) {
        throw new Error('For copies, the IO type must be the same');
      } else if (handlingType === HANDLING_TYPE.MOVE) {
        throw new Error('For moves, the IO type must be the same');
      }
    }

    this._config = config;
    this._input = InputFactory.create(inputConfig);
    this._output = OutputFactory.create(outputConfig);
    this._operationFn = operationFn;
  }

  /**
   * 入出力の処理を行う
   * @param params
   * @param options
   * @returns
   */
  async handle(params: IterationParams, options: HandleOptions = {}): Promise<MigrationIterationResult> {
    const config = this._config;
    const { handlingType, onItemStart, onItemEnd, onItemError } = this._config;
    const { operationFn = this._operationFn, ...rest } = options;

    try {
      const result: MigrationIterationResult = { status: MIGRATION_STATUS.SUCCESS, results: [] };

      // アクティベーション
      const activateResult = await this._activate(params, rest);
      const activatedParams = assignParams(params, activateResult);
      // イテレーターを取得
      const inputIterator = this._read(activatedParams, rest);

      let endResult: DiffParams;
      // 入力を回す
      while (true) {
        // activate後のパラメーターと前回終了時のパラメーターをマージしたもので開始
        let currentParams = { ...activatedParams, ...endResult };
        try {
          // 前処理
          const startResult = await this._start(currentParams, rest);
          currentParams = assignParams(currentParams, startResult);

          const next = await inputIterator.next();

          if (next.done) {
            // イテレーターが終わった時はbreak
            break;
          }
          const inputItem = next.value;
          const inputItemType = inputItem.result.inputItemType;
          // 入力時の結果をパラメーターにマージ
          currentParams = assignParams(currentParams, inputItem.result);

          // 入力後処理
          const prepareResult = await this._afterRead(currentParams, rest);
          currentParams = assignParams(currentParams, prepareResult);

          const itemStartResult = applyIf(onItemStart, [config, currentParams]);
          currentParams = { ...currentParams, ...itemStartResult };

          if (inputItem.status === MIGRATION_ITEM_STATUS.BREAK) {
            // 読み込み処理でブレイクした場合
            const itemResult: MigrationItemResult = {
              ...getResult(currentParams),
              status: MIGRATION_ITEM_STATUS.BREAK,
              operationStatus: OPERATION_STATUS.UNPROCESSED,
            };
            result.results.push(itemResult);
            result.isBroken = true;
            applyIf(onItemEnd, [itemResult, config, currentParams]);
            break;
          } else if (inputItem.status === MIGRATION_ITEM_STATUS.SKIPPED) {
            // 読み込み処理でスキップした場合
            const itemResult: MigrationItemResult = {
              ...getResult(currentParams),
              status: MIGRATION_ITEM_STATUS.SKIPPED,
              operationStatus: OPERATION_STATUS.UNPROCESSED,
            };
            result.results.push(itemResult);
            applyIf(onItemEnd, [itemResult, config, currentParams]);
            continue;
          }

          let operationResult: OperationResult;
          if (inputItemType === ITEM_TYPE.NODE) {
            // NODEの場合
            operationResult = { operationStatus: OPERATION_STATUS.UNPROCESSED, content: {} };
          } else {
            // LEAFの場合
            // コンテンツを処理
            operationResult = await operationFn(inputItem.content, currentParams);
          }

          // 出力処理
          const outputItem = await this._write(operationResult.content, currentParams, rest);
          currentParams = assignParams(currentParams, outputItem.result);

          // 入力を削除
          let deleteResult;
          if (handlingType === HANDLING_TYPE.DELETE) {
            deleteResult = await this._delete(inputItem.content, currentParams, rest);
            currentParams = assignParams(currentParams, deleteResult);
          }

          // 要素の処理結果
          const itemResult: MigrationItemResult = {
            ...getResult(currentParams),
            status: outputItem.status,
            operationStatus: operationResult.operationStatus,
          };
          result.results.push(itemResult);

          if (itemResult.status === MIGRATION_ITEM_STATUS.ERROR) {
            result.status = MIGRATION_STATUS.ERROR;
          }

          // 後処理
          endResult = await this._end(currentParams, rest);
          currentParams = assignParams(currentParams, endResult);

          applyIf(onItemEnd, [itemResult, config, currentParams]);
        } catch (error) {
          // エラー処理
          const errorResult = await this._error(currentParams, rest);
          currentParams = assignParams(currentParams, errorResult);
          applyIf(onItemError, [error, config, currentParams]);
          throw propagateError(error, `${currentParams._inputItem}`);
        }
      }
      // ディアクティベーション
      await this._deactivate(activatedParams, rest);

      return result;
    } catch (error) {
      // エラー処理
      const errorResult = await this._error(params, rest);
      const errorParams = assignParams(params, errorResult);
      applyIf(onItemError, [error, config, errorParams]);
      throw error;
    }
  }

  /**
   * 初期化処理
   * @param params
   * @param options
   */
  private async _activate(params: IterationParams, options: HandleIoOptions): Promise<DiffParams> {
    const { input = this._input, output = this._output } = options;
    const inputDiffParams = await input.activate(params);
    const outputDiffParams = await output.activate(assignParams(params, inputDiffParams));
    return { ...inputDiffParams, ...outputDiffParams };
  }

  /**
   * 入力1件毎の開始処理
   * @param params
   * @param options
   * @returns
   */
  private async _start(params: IterationParams, options: HandleIoOptions): Promise<DiffParams> {
    const { input = this._input, output = this._output } = options;
    const inputDiffParams = await input.start(params);
    const outputDiffParams = await output.start(assignParams(params, inputDiffParams));
    return { ...inputDiffParams, ...outputDiffParams };
  }

  /**
   * 入力処理
   * @param params
   * @param options
   * @returns
   */
  private _read(
    params: IterationParams,
    options: HandleIoOptions = {},
  ): AsyncIterableIterator<InputReturnValue<any, any>> {
    const { input = this._input } = options;
    const handlingType = this._config.handlingType;

    if (handlingType === HANDLING_TYPE.COPY) {
      return input.copy(params);
    } else if (handlingType === HANDLING_TYPE.MOVE) {
      return input.move(params);
    } else {
      return input.read(params);
    }
  }

  /**
   * 入力後処理
   * @param params
   * @param options
   * @returns
   */
  private async _afterRead(params: IterationParams, options: HandleIoOptions): Promise<DiffParams | void> {
    const { input = this._input, output = this._output } = options;
    const inputDiffParams = await input.complete(params);
    const outputDiffParams = await output.prepare(assignParams(params, inputDiffParams));
    return { ...inputDiffParams, ...outputDiffParams };
  }

  /**
   * 出力処理
   * @param content
   * @param params
   * @param options
   * @returns
   */
  private _write<C>(
    content: C,
    params: IterationParams,
    options: HandleIoOptions,
  ): Promise<OutputReturnValue<IterationParams>> {
    const { output = this._output } = options;
    const handlingType = this._config.handlingType;

    if (handlingType === HANDLING_TYPE.COPY) {
      return output.copy(params);
    } else if (handlingType === HANDLING_TYPE.MOVE) {
      return output.move(params);
    } else {
      return output.write(content, params);
    }
  }

  /**
   * 削除処理
   * @param content
   * @param params
   * @param options
   * @returns
   */
  private _delete<C>(content: C, params: IterationParams, options: HandleIoOptions): Promise<DiffParams | void> {
    if (this._config.handlingType === HANDLING_TYPE.DELETE) {
      const { input = this._input } = options;
      return input.delete(content, params);
    }
  }

  /**
   * 入力1件毎の終了処理
   * @param params
   * @param options
   * @returns
   */
  private async _end(params: IterationParams, options: HandleIoOptions): Promise<DiffParams> {
    const { input = this._input, output = this._output } = options;
    const inputDiffParams = await input.end(params);
    const outputDiffParams = await output.end(assignParams(params, inputDiffParams));
    return { ...inputDiffParams, ...outputDiffParams };
  }

  /**
   * 完了処理
   * @param params
   * @param options
   */
  private async _deactivate(params: IterationParams, options: HandleIoOptions): Promise<DiffParams> {
    const { input = this._input, output = this._output } = options;
    const inputDiffParams = await input.deactivate(params);
    const outputDiffParams = await output.deactivate(assignParams(params, inputDiffParams));
    return { ...inputDiffParams, ...outputDiffParams };
  }

  /**
   * 例外処理
   * @param params
   * @param options
   */
  private async _error(params: IterationParams, options: HandleIoOptions): Promise<DiffParams> {
    const { input = this._input, output = this._output } = options;
    const inputDiffParams = await input.error(params);
    const outputDiffParams = await output.error(assignParams(params, inputDiffParams));
    return { ...inputDiffParams, ...outputDiffParams };
  }
}

/**
 * IoConfigを取得する
 * @param config
 * @param isOutput
 * @returns
 */
function getIoConfig(config: string | InputConfig | OutputConfig, isOutput?: boolean) {
  const pathParam = isOutput ? 'outputPath' : 'inputPath';
  return isString(config) ? { type: IO_TYPE.FS, [pathParam]: config } : config || { type: IO_TYPE.NOOP };
}

function getResult(params: AssignedParams<InputResultBase & OutputResultBase>): InputResultBase & OutputResultBase {
  const {
    _inputItem,
    _inputItemType,
    _inputContentType,
    _inputEncoding,
    _inputItemPath,
    _outputItem,
    _outputItemType,
    _outputContentType,
    _outputEncoding,
    _outputItemPath,
  } = params;

  return {
    inputItem: _inputItem,
    inputItemType: _inputItemType,
    inputContentType: _inputContentType,
    inputEncoding: _inputEncoding,
    inputItemPath: _inputItemPath,
    outputItem: _outputItem,
    outputItemType: _outputItemType,
    outputContentType: _outputContentType,
    outputEncoding: _outputEncoding,
    outputItemPath: _outputItemPath,
  };
}
