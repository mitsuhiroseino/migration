import { CommonIoConfig, DiffParams, IterationParams } from '../types';
import assignParams from '../utils/assignParams';
import { InputFactory } from './inputs';
import { OutputFactory } from './outputs';
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
    if (config.copy && inputConfig.type !== outputConfig.type) {
      throw new Error('For copies, the IO type must be the same');
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
  async initialize(params: IterationParams): Promise<DiffParams> {
    const inputDiffParams = await this._input.initialize(params);
    const outputDiffParams = await this._output.initialize(assignParams(params, inputDiffParams));
    return { ...inputDiffParams, ...outputDiffParams };
  }

  /**
   * 入力処理
   * @param params
   * @returns
   */
  read(params: IterationParams): AsyncIterable<InputReturnValue<any, any>> {
    if (this._config.copy) {
      return this._input.copy(params);
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
    if (this._config.copy) {
      return this._output.copy(params);
    } else {
      return this._output.write(content, params);
    }
  }

  /**
   * 削除処理
   * @param params
   * @returns
   */
  remove(params: IterationParams): Promise<DiffParams> {
    if (this._config.remove) {
      return this._input.remove(params);
    }
  }

  /**
   * 完了処理
   * @param params
   */
  async complete(params: IterationParams): Promise<DiffParams> {
    const inputDiffParams = await this._input.complete(params);
    const outputDiffParams = await this._output.complete(assignParams(params, inputDiffParams));
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
