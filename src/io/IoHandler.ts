import { IterationParams } from '../types';
import { Input, InputConfig, InputFactory, InputReturnValue } from './inputs';
import { Output, OutputConfig, OutputFactory, OutputReturnValue } from './outputs';
import { IoBase } from './types';

export type IoHandlerConfig = {
  copy?: boolean;
};

type s = Iterable<any>;

export default class IoHandler<IC extends InputConfig = InputConfig, OC extends OutputConfig = OutputConfig>
  implements IoBase
{
  private _input: Input<any, any>;
  private _output: Output<any, any>;
  private _copy?: boolean;
  private _active: boolean = false;

  constructor(inputConfig: IC, outputConfig: OC, config: IoHandlerConfig) {
    const { copy } = config;
    if (copy && inputConfig.type !== outputConfig.type) {
      throw new Error('For copies, the IO type must be the same');
    }

    this._copy = copy;
    this._input = InputFactory.create(inputConfig);
    this._output = OutputFactory.create(outputConfig);
    this._active = true;
  }

  /**
   * 初期化処理
   * @param params
   */
  initialize(params: IterationParams): Promise<void> {
    this._input.initialize(params);
    this._output.initialize(params);
    return;
  }

  /**
   * 入力処理
   * @param params
   * @returns
   */
  read(params: IterationParams): AsyncIterable<InputReturnValue<any, any>> {
    if (this._copy) {
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
    if (this._copy) {
      return this._output.copy(content, params);
    } else {
      return this._output.write(content, params);
    }
  }

  /**
   * 完了処理
   * @param params
   */
  complete(params: IterationParams): Promise<void> {
    this._input.complete(params);
    this._output.complete(params);
    this._active = false;
    return;
  }

  /**
   * 例外処理
   * @param params
   */
  error(params: IterationParams): Promise<void> {
    if (this._active) {
      this._input.error(params);
      this._output.error(params);
    }
    this._active = false;
    return;
  }
}
