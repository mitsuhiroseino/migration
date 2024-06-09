import { DiffParams, IterationParams } from '../types';
import { Io, IoConfigBase } from './types';

/**
 * 入出力の基底クラス
 */
abstract class IoBase<C extends IoConfigBase> implements Io {
  protected _active: boolean;

  protected _config: C;

  constructor(config: C) {
    this._config = config;
  }

  activate(params: IterationParams): Promise<DiffParams> {
    this._active = true;
    return this._activate(params);
  }

  /**
   * 種別固有の開始処理
   * @param params
   * @returns
   */
  protected _activate(params: IterationParams): Promise<DiffParams> {
    return Promise.resolve({});
  }

  start(params: IterationParams): Promise<DiffParams> {
    return this._start(params);
  }

  /**
   * 種別固有の繰り返し毎の開始処理
   * @param params
   * @returns
   */
  protected _start(params: IterationParams): Promise<DiffParams> {
    return Promise.resolve({});
  }

  end(params: IterationParams): Promise<DiffParams> {
    return Promise.resolve({});
  }

  /**
   * 種別固有の繰り返し毎の終了処理
   * @param params
   * @returns
   */
  protected _end(params: IterationParams): Promise<DiffParams> {
    return this._end(params);
  }

  async deactivate(params: IterationParams): Promise<DiffParams> {
    const result = await this._deactivate(params);
    this._active = false;
    return result;
  }

  /**
   * 種別固有の完了処理
   * @param params
   * @returns
   */
  protected _deactivate(params: IterationParams): Promise<DiffParams> {
    return Promise.resolve({});
  }

  error(params: IterationParams): Promise<DiffParams> {
    if (this._active) {
      return this._error(params);
    }
    return Promise.resolve({});
  }

  /**
   * 種別固有の例外処理
   * @param params
   * @returns
   */
  protected _error(params: IterationParams): Promise<DiffParams> {
    return Promise.resolve({});
  }
}
export default IoBase;
