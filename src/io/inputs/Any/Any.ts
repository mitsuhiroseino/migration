import { Content, DiffParams, IterationParams } from '../../../types';
import getEmptyAsyncIterable from '../../../utils/getEmptyAsyncIterable';
import { IO_TYPE } from '../../constants';
import { InputReturnValue } from '../../types';
import InputBase from '../InputBase';
import InputFactory from '../InputFactory';
import { AnyInputConfig, AnyInputResult } from './types';

/**
 * 任意
 */
class Any<C = Content> extends InputBase<C, AnyInputConfig, AnyInputResult> {
  read(params: IterationParams): AsyncIterable<InputReturnValue<C, AnyInputResult>> {
    const { read: readFn = getEmptyAsyncIterable } = this._config;
    return readFn(params, this._config);
  }

  copy(params: IterationParams): AsyncIterable<InputReturnValue<C, AnyInputResult>> {
    const { copy: copyFn = getEmptyAsyncIterable } = this._config;
    return copyFn(params, this._config);
  }

  move(params: IterationParams): AsyncIterable<InputReturnValue<C, AnyInputResult>> {
    const { move: moveFn = getEmptyAsyncIterable } = this._config;
    return moveFn(params, this._config);
  }

  async delete(params: IterationParams): Promise<DiffParams> {
    const { delete: deleteFn = () => ({}) } = this._config;
    return deleteFn(params, this._config);
  }
}
InputFactory.register(IO_TYPE.ANY, Any);
export default Any;
