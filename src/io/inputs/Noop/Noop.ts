import { Content, DiffParams, IterationParams } from '../../../types';
import toAsyncIterable from '../../../utils/toAsyncIterable';
import { IO_TYPE } from '../../constants';
import { InputReturnValue } from '../../types';
import InputBase from '../InputBase';
import InputFactory from '../InputFactory';
import { NoopInputConfig, NoopInputResult } from './types';

const getNoopInputResult = () => toAsyncIterable([{}]);

/**
 * なにもしない
 */
class Noop extends InputBase<Content, NoopInputConfig, NoopInputResult> {
  read(params: IterationParams): AsyncIterable<InputReturnValue<Content, NoopInputResult>> {
    return getNoopInputResult();
  }

  copy(params: IterationParams): AsyncIterable<InputReturnValue<Content, NoopInputResult>> {
    return getNoopInputResult();
  }

  move(params: IterationParams): AsyncIterable<InputReturnValue<Content, NoopInputResult>> {
    return getNoopInputResult();
  }

  async delete(params: IterationParams): Promise<DiffParams> {
    return {};
  }
}
InputFactory.register(IO_TYPE.NOOP, Noop);
export default Noop;
