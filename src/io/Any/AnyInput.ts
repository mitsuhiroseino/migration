import { Content, DiffParams, IterationParams } from '../../types';
import getEmptyAsyncGenerator from '../../utils/getEmptyAsyncGenerator';
import InputBase from '../InputBase';
import InputFactory from '../InputFactory';
import { IO_TYPE } from '../constants';
import { InputReturnValue } from '../types';
import { AnyInputConfig, AnyInputResult } from './types';

/**
 * 任意
 */
class AnyInput<C = Content> extends InputBase<C, AnyInputConfig, AnyInputResult> {
  read(params: IterationParams): AsyncIterableIterator<InputReturnValue<C, AnyInputResult>> {
    const { read: readFn = getEmptyAsyncGenerator() } = this._config;
    return readFn(params, this._config);
  }

  copy(params: IterationParams): AsyncIterableIterator<InputReturnValue<C, AnyInputResult>> {
    const { copy: copyFn = getEmptyAsyncGenerator() } = this._config;
    return copyFn(params, this._config);
  }

  move(params: IterationParams): AsyncIterableIterator<InputReturnValue<C, AnyInputResult>> {
    const { move: moveFn = getEmptyAsyncGenerator() } = this._config;
    return moveFn(params, this._config);
  }

  async delete(params: IterationParams): Promise<DiffParams> {
    if (!this._config.dryRun) {
      const { delete: deleteFn = () => ({}) } = this._config;
      return await deleteFn(params, this._config);
    }
    return {};
  }
}
InputFactory.register(IO_TYPE.ANY, AnyInput);
export default AnyInput;
