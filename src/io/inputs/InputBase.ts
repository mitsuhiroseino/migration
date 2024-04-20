import { Content, IterationParams } from '../../types';
import { CommonInputResult } from '../types';
import { Input, InputConfigBase, InputReturnValue } from './types';

/**
 * 入力の設定
 */
abstract class InputBase<
  C extends Content,
  IC extends InputConfigBase = InputConfigBase,
  IR extends CommonInputResult = CommonInputResult,
> implements Input<C, IR>
{
  protected _config: IC;

  protected _params: IterationParams;

  constructor(config: IC, params: IterationParams) {
    this._config = config;
    this._params = params;
  }

  initialize(params: IterationParams): Promise<void> {
    return Promise.resolve();
  }

  abstract read(params: IterationParams): AsyncIterable<InputReturnValue<C, IR>>;

  abstract copy(params: IterationParams): AsyncIterable<InputReturnValue<C, IR>>;

  complete(params: IterationParams): Promise<void> {
    return Promise.resolve();
  }

  error(params: IterationParams): Promise<void> {
    return Promise.resolve();
  }
}
export default InputBase;

class InputAsyncIterable<C extends Content, IR extends CommonInputResult = CommonInputResult>
  implements AsyncIterable<InputReturnValue<C, IR>>
{
  constructor(private _iterator: AsyncIterator<InputReturnValue<C, IR>>) {}
  [Symbol.asyncIterator](): AsyncIterator<InputReturnValue<C, IR>, any, undefined> {
    return this._iterator;
  }
}
