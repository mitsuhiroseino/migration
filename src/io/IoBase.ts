import { DiffParams, IterationParams } from '../types';
import { InputOutputConfigBase, Io } from './types';

/**
 * 入出力の基底クラス
 */
abstract class IoBase<C extends InputOutputConfigBase> implements Io {
  protected _active: boolean;

  protected _config: C;

  constructor(config: C) {
    this._config = config;
  }

  async activate(params: IterationParams): Promise<DiffParams> {
    this._active = true;
    return (await this._activate(params)) || {};
  }

  /**
   * 種別固有の開始処理
   * @param params
   * @returns
   */
  protected async _activate(params: IterationParams): Promise<DiffParams | void> {}

  async start(params: IterationParams): Promise<DiffParams> {
    return (await this._start(params)) || {};
  }

  /**
   * 種別固有の繰り返し毎の開始処理
   * @param params
   * @returns
   */
  protected async _start(params: IterationParams): Promise<DiffParams | void> {}

  async end(params: IterationParams): Promise<DiffParams> {
    return (await this._end(params)) || {};
  }

  /**
   * 種別固有の繰り返し毎の終了処理
   * @param params
   * @returns
   */
  protected async _end(params: IterationParams): Promise<DiffParams | void> {}

  async deactivate(params: IterationParams): Promise<DiffParams> {
    const result = await this._deactivate(params);
    this._active = false;
    return result || {};
  }

  /**
   * 種別固有の完了処理
   * @param params
   * @returns
   */
  protected async _deactivate(params: IterationParams): Promise<DiffParams | void> {}

  async error(params: IterationParams): Promise<DiffParams> {
    if (this._active) {
      return (await this._error(params)) || {};
    }
  }

  /**
   * 種別固有の例外処理
   * @param params
   * @returns
   */
  protected async _error(params: IterationParams): Promise<DiffParams | void> {}
}
export default IoBase;
