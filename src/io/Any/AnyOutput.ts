import { Content, IterationParams } from '../../types';
import OutputBase from '../OutputBase';
import OutputFactory from '../OutputFactory';
import { IO_TYPE } from '../constants';
import { AnyOutputConfig, AnyOutputResult } from './types';

/**
 * 任意の出力
 * @param config 入力設定
 * @param params 1繰り返し毎のパラメーター
 */
class AnyOutput<C = Content> extends OutputBase<Content, AnyOutputConfig<C>, AnyOutputResult> {
  protected async _write(content: any, params: IterationParams): Promise<void> {
    const { write: writeFn } = this._config;
    if (writeFn) {
      await writeFn(content, params, this._config);
    }
  }

  protected async _copy(params: IterationParams): Promise<void> {
    const { copy: copyFn } = this._config;
    if (copyFn) {
      await copyFn(params, this._config);
    }
  }

  protected async _move(params: IterationParams): Promise<void> {
    const { move: moveFn } = this._config;
    if (moveFn) {
      await moveFn(params, this._config);
    }
  }
}

OutputFactory.register(IO_TYPE.ANY, AnyOutput);
export default AnyOutput;
