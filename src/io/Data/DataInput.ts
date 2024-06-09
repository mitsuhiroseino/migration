import { Content, DiffParams, IterationParams } from '../../types';
import toAsyncGenerator from '../../utils/toAsyncGenerator';
import InputBase from '../InputBase';
import InputFactory from '../InputFactory';
import { IO_TYPE } from '../constants';
import { InputReturnValue } from '../types';
import { DataInputConfig, DataInputResult } from './types';

/**
 * データ
 */
class DataInput extends InputBase<Content, DataInputConfig, DataInputResult> {
  /**
   * ジェネレーター
   */
  private _generator: () => AsyncGenerator<Content>;

  protected async _activate(params: IterationParams): Promise<DiffParams> {
    const { content, result } = this._config;
    this._generator = toAsyncGenerator({ content, result }, [params]);
    return {};
  }

  protected _read(params: IterationParams): AsyncIterableIterator<InputReturnValue<Content, DataInputResult>> {
    return this._generator();
  }

  protected _copy(params: IterationParams): AsyncIterableIterator<InputReturnValue<Content, DataInputResult>> {
    return this._generator();
  }

  protected _move(params: IterationParams): AsyncIterableIterator<InputReturnValue<Content, DataInputResult>> {
    return this._generator();
  }

  protected async _delete(content: Content, params: IterationParams): Promise<void> {}
}
InputFactory.register(IO_TYPE.DATA, DataInput);
export default DataInput;
