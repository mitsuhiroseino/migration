import { Content, IterationParams } from '../../types';
import getEmptyAsyncGenerator from '../../utils/getEmptyAsyncGenerator';
import InputBase from '../InputBase';
import InputFactory from '../InputFactory';
import { IO_TYPE } from '../constants';
import { InputReturnValue } from '../types';
import { AnyInputConfig, AnyInputResult } from './types';

/**
 * 任意
 */
class AnyInput<C = Content> extends InputBase<C, AnyInputConfig<C>, AnyInputResult> {
  protected _read(params: IterationParams): AsyncIterableIterator<InputReturnValue<C, AnyInputResult>> {
    const { read: readFn = getEmptyAsyncGenerator() } = this._config;
    return readFn(params, this._config);
  }

  protected _copy(params: IterationParams): AsyncIterableIterator<InputReturnValue<C, AnyInputResult>> {
    const { copy: copyFn = getEmptyAsyncGenerator() } = this._config;
    return copyFn(params, this._config);
  }

  protected _move(params: IterationParams): AsyncIterableIterator<InputReturnValue<C, AnyInputResult>> {
    const { move: moveFn = getEmptyAsyncGenerator() } = this._config;
    return moveFn(params, this._config);
  }

  protected async _delete(content: C, params: IterationParams): Promise<void> {
    const { delete: deleteFn = () => ({}) } = this._config;
    await deleteFn(content, params, this._config);
  }
}
InputFactory.register(IO_TYPE.ANY, AnyInput);
export default AnyInput;
