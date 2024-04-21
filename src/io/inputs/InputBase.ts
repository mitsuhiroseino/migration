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

  protected _params: IterationParams;

  constructor(config: IC, params: IterationParams) {
    this._config = config;
    this._params = params;
  }

  initialize(params: IterationParams): Promise<DiffParams> {
    return Promise.resolve({});
  }

  abstract read(params: IterationParams): AsyncIterable<InputReturnValue<C, IR>>;

  abstract copy(params: IterationParams): AsyncIterable<InputReturnValue<C, IR>>;

  complete(params: IterationParams): Promise<DiffParams> {
    return Promise.resolve({});
  }

  error(params: IterationParams): Promise<DiffParams> {
    return Promise.resolve({});
  }
}
export default InputBase;
