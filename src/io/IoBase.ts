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

  activate(params: IterationParams): Promise<DiffParams | void> {
    this._active = true;
    return this._activate(params);
  }

  /**
   * 種別固有の開始処理
   * @param params
   * @returns
   */
  protected async _activate(params: IterationParams): Promise<DiffParams | void> {}

  start(params: IterationParams): Promise<DiffParams | void> {
    return this._start(params);
  }

  /**
   * 種別固有の繰り返し毎の開始処理
   * @param params
   * @returns
   */
  protected async _start(params: IterationParams): Promise<DiffParams | void> {}

  end(params: IterationParams): Promise<DiffParams | void> {
    return this._end(params);
  }

  /**
   * 種別固有の繰り返し毎の終了処理
   * @param params
   * @returns
   */
  protected async _end(params: IterationParams): Promise<DiffParams | void> {}

  async deactivate(params: IterationParams): Promise<DiffParams | void> {
    const result = await this._deactivate(params);
    this._active = false;
    return result;
  }

  /**
   * 種別固有の完了処理
   * @param params
   * @returns
   */
  protected async _deactivate(params: IterationParams): Promise<DiffParams | void> {}

  async error(params: IterationParams): Promise<DiffParams | void> {
    if (this._active) {
      return this._error(params);
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
