import { Content, DiffParams, IterationParams } from '../../types';
import { Input, InputConfigBase, InputResultBase, InputReturnValue } from '../types';

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

  initialize(params: IterationParams): Promise<DiffParams> {
    return Promise.resolve({});
  }

  abstract read(params: IterationParams): AsyncIterable<InputReturnValue<C, IR>>;

  abstract copy(params: IterationParams): AsyncIterable<InputReturnValue<C, IR>>;

  abstract move(params: IterationParams): AsyncIterable<InputReturnValue<C, IR>>;

  abstract delete(params: IterationParams): Promise<DiffParams>;

  complete(params: IterationParams): Promise<DiffParams> {
    return Promise.resolve({});
  }

  error(params: IterationParams): Promise<DiffParams> {
    return Promise.resolve({});
  }
}
export default InputBase;
