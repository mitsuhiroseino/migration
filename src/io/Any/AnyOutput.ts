import { ReplaceOptions } from 'src/utils/replace';
import { Content, IterationParams } from '../../types';
import OutputBase from '../OutputBase';
import OutputFactory from '../OutputFactory';
import { IO_TYPE } from '../constants';
import { OutputResultBase, OutputReturnValue } from '../types';
import { AnyOutputConfig, AnyOutputResult } from './types';

/**
 * 任意の出力
 * @param config 入力設定
 * @param params 1繰り返し毎のパラメーター
 */
class AnyOutput<C = Content> extends OutputBase<Content, AnyOutputConfig<C>, AnyOutputResult> {
  private _result: OutputReturnValue<AnyOutputResult>;

  protected _start(params: IterationParams): Promise<void | ReplaceOptions> {
    this._result = null;
    return super._start(params);
  }

  protected async _write(content: any, params: IterationParams): Promise<void> {
    const { write: writeFn } = this._config;
    if (writeFn) {
      this._result = await writeFn(content, params, this._config);
    }
  }

  protected _getWriteResult(content: any, params: IterationParams): OutputReturnValue<OutputResultBase> {
    const { status, result } = this._result;
    return {
      ...this._handleNoContent(content, params, status),
      ...result,
    };
  }

  protected async _copy(params: IterationParams): Promise<void> {
    const { copy: copyFn } = this._config;
    if (copyFn) {
      this._result = await copyFn(params, this._config);
    }
  }

  protected async _move(params: IterationParams): Promise<void> {
    const { move: moveFn } = this._config;
    if (moveFn) {
      this._result = await moveFn(params, this._config);
    }
  }
}

OutputFactory.register(IO_TYPE.ANY, AnyOutput);
export default AnyOutput;
