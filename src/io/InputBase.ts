import { Content, DiffParams, IterationParams } from '../types';
import { Input, InputConfigBase, InputResultBase, InputReturnValue } from './types';

/**
 * 入力の基底クラス
 */
abstract class InputBase<
  C extends Content,
  IC extends InputConfigBase = InputConfigBase,
  IR extends InputResultBase = InputResultBase,
> implements Input<C, IR>
{
  protected _config: IC;

  constructor(config: IC) {
    this._config = config;
  }

  activate(params: IterationParams): Promise<DiffParams> {
    return Promise.resolve({});
  }

  start(params: IterationParams): Promise<DiffParams> {
    return Promise.resolve({});
  }

  abstract read(params: IterationParams): AsyncIterableIterator<InputReturnValue<C, IR>>;

  abstract copy(params: IterationParams): AsyncIterableIterator<InputReturnValue<C, IR>>;

  abstract move(params: IterationParams): AsyncIterableIterator<InputReturnValue<C, IR>>;

  abstract delete(params: IterationParams): Promise<DiffParams>;

  end(params: IterationParams): Promise<DiffParams> {
    return Promise.resolve({});
  }

  deactivate(params: IterationParams): Promise<DiffParams> {
    return Promise.resolve({});
  }

  error(params: IterationParams): Promise<DiffParams> {
    return Promise.resolve({});
  }
}
export default InputBase;
