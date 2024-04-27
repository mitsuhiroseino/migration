import { Content, DiffParams, IterationParams } from '../../types';
import { Output, OutputConfigBase, OutputResultBase, OutputReturnValue } from '../types';

/**
 * 出力の設定
 */
abstract class OutputBase<
  C extends Content,
  OC extends OutputConfigBase<OutputConfigBase['type']> = OutputConfigBase<OutputConfigBase['type']>,
  OR extends OutputResultBase = OutputResultBase,
> implements Output<C, OR>
{
  protected _config: OC;

  constructor(config: OC) {
    this._config = config;
  }

  initialize(params: IterationParams): Promise<DiffParams> {
    return Promise.resolve({});
  }

  abstract write(content: C, params: IterationParams): Promise<OutputReturnValue<OR>>;

  abstract copy(params: IterationParams): Promise<OutputReturnValue<OR>>;

  abstract move(params: IterationParams): Promise<OutputReturnValue<OR>>;

  complete(params: IterationParams): Promise<DiffParams> {
    return Promise.resolve({});
  }

  error(params: IterationParams): Promise<DiffParams> {
    return Promise.resolve({});
  }
}
export default OutputBase;
