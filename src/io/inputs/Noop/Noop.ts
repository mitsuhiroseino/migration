import { Content, IterationParams } from '../../../types';
import toAsyncIterable from '../../../utils/toAsyncIterable';
import { IO_TYPE } from '../../constants';
import InputBase from '../InputBase';
import InputFactory from '../InputFactory';
import { InputReturnValue } from '../types';
import { NoopInputConfig, NoopInputResult } from './types';

/**
 * なにもしない
 */
class Noop extends InputBase<Content, NoopInputConfig, NoopInputResult> {
  read(params: IterationParams): AsyncIterable<InputReturnValue<Content, NoopInputResult>> {
    return toAsyncIterable([
      {
        result: {},
      },
    ]);
  }
  copy(params: IterationParams): AsyncIterable<InputReturnValue<Content, NoopInputResult>> {
    return toAsyncIterable([
      {
        result: {},
      },
    ]);
  }
}
InputFactory.register(IO_TYPE.NOOP, Noop);
export default Noop;