import { ITEM_TYPE, MIGRATION_ITEM_STATUS } from '../../constants';
import { Content, IterationParams } from '../../types';
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
    return getAsyncGenerator();
  }

  protected _copy(params: IterationParams): AsyncIterableIterator<InputReturnValue<Content, NoopInputResult>> {
    return getAsyncGenerator();
  }

  protected _move(params: IterationParams): AsyncIterableIterator<InputReturnValue<Content, NoopInputResult>> {
    return getAsyncGenerator();
  }

  protected async _delete(content: Content, params: IterationParams): Promise<void> {}
}
InputFactory.register(IO_TYPE.NOOP, NoopInput);
export default NoopInput;

function getAsyncGenerator() {
  return toAsyncGenerator({
    status: MIGRATION_ITEM_STATUS.PROCESSED,
    content: null,
    result: {
      inputItemType: ITEM_TYPE.LEAF,
    },
  })();
}
