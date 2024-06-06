import { HANDLING_TYPE } from '../constants';
import { CommonIoConfig, DiffParams, IterationParams } from '../types';
import assignParams from '../utils/assignParams';
import InputFactory from './InputFactory';
import OutputFactory from './OutputFactory';
import { Input, InputConfig, InputReturnValue, IoBase, Output, OutputConfig, OutputReturnValue } from './types';

export type IoHandlerConfig = CommonIoConfig;

/**
 * 入力と出力を操作するクラス
 */
export default class IoHandler<IC extends InputConfig = InputConfig, OC extends OutputConfig = OutputConfig>
  implements IoBase
{
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
   * 処理中
   */
  private _active: boolean = false;

  /**
   * コンストラクター
   * @param inputConfig 入力設定
   * @param outputConfig 出力設定
   * @param config 入出力設定
   */
  constructor(inputConfig: IC, outputConfig: OC, config: IoHandlerConfig) {
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
    this._active = true;
  }

  /**
   * 初期化処理
   * @param params
   */
  async activate(params: IterationParams): Promise<DiffParams> {
    const inputDiffParams = await this._input.activate(params);
    const outputDiffParams = await this._output.activate(assignParams(params, inputDiffParams));
    return { ...inputDiffParams, ...outputDiffParams };
  }

  async start(params: IterationParams): Promise<DiffParams> {
    const inputDiffParams = await this._input.start(params);
    const outputDiffParams = await this._output.start(assignParams(params, inputDiffParams));
    return { ...inputDiffParams, ...outputDiffParams };
  }

  /**
   * 入力処理
   * @param params
   * @returns
   */
  read(params: IterationParams): AsyncIterableIterator<InputReturnValue<any, any>> {
    const handlingType = this._config.handlingType;

    if (handlingType === HANDLING_TYPE.COPY) {
      return this._input.copy(params);
    } else if (handlingType === HANDLING_TYPE.MOVE) {
      return this._input.move(params);
    } else {
      return this._input.read(params);
    }
  }

  /**
   * 出力処理
   * @param params
   * @returns
   */
  write<C>(content: C, params: IterationParams): Promise<OutputReturnValue<IterationParams>> {
    const handlingType = this._config.handlingType;

    if (handlingType === HANDLING_TYPE.COPY) {
      return this._output.copy(params);
    } else if (handlingType === HANDLING_TYPE.MOVE) {
      return this._output.move(params);
    } else {
      return this._output.write(content, params);
    }
  }

  /**
   * 削除処理
   * @param params
   * @returns
   */
  delete(params: IterationParams): Promise<DiffParams> {
    if (this._config.handlingType === HANDLING_TYPE.DELETE) {
      return this._input.delete(params);
    }
  }

  async end(params: IterationParams): Promise<DiffParams> {
    const inputDiffParams = await this._input.end(params);
    const outputDiffParams = await this._output.end(assignParams(params, inputDiffParams));
    return { ...inputDiffParams, ...outputDiffParams };
  }

  /**
   * 完了処理
   * @param params
   */
  async deactivate(params: IterationParams): Promise<DiffParams> {
    const inputDiffParams = await this._input.deactivate(params);
    const outputDiffParams = await this._output.deactivate(assignParams(params, inputDiffParams));
    this._active = false;
    return { ...inputDiffParams, ...outputDiffParams };
  }

  /**
   * 例外処理
   * @param params
   */
  async error(params: IterationParams): Promise<DiffParams> {
    if (this._active) {
      const inputDiffParams = await this._input.error(params);
      const outputDiffParams = await this._output.error(assignParams(params, inputDiffParams));
      this._active = false;
      return { ...inputDiffParams, ...outputDiffParams };
    }
    return {};
  }
}
