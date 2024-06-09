import { Content, DiffParams, IterationParams } from '../../types';
import toAsyncGenerator from '../../utils/toAsyncGenerator';
import InputBase from '../InputBase';
import InputFactory from '../InputFactory';
import { IO_TYPE } from '../constants';
import { InputReturnValue } from '../types';
import { NoopInputConfig, NoopInputResult } from './types';

/**
 * なにもしない
 */
class NoopInput extends InputBase<Content, NoopInputConfig, NoopInputResult> {
  protected _read(params: IterationParams): AsyncIterableIterator<InputReturnValue<Content, NoopInputResult>> {
    return toAsyncGenerator({})();
  }

  protected _copy(params: IterationParams): AsyncIterableIterator<InputReturnValue<Content, NoopInputResult>> {
    return toAsyncGenerator({})();
  }

  protected _move(params: IterationParams): AsyncIterableIterator<InputReturnValue<Content, NoopInputResult>> {
    return toAsyncGenerator({})();
  }

  protected async _delete(params: IterationParams): Promise<void> {}
}
InputFactory.register(IO_TYPE.NOOP, NoopInput);
export default NoopInput;
