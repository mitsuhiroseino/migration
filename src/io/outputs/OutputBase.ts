import { Content, IterationParams } from '../../types';
import { CommonOutputResult } from '../types';
import { Output, OutputConfigBase, OutputReturnValue } from './types';

/**
 * 出力の設定
 */
abstract class OutputBase<
  C extends Content,
  OC extends OutputConfigBase<OutputConfigBase['type']> = OutputConfigBase<OutputConfigBase['type']>,
  OR extends CommonOutputResult = CommonOutputResult,
> implements Output<C, OR>
{
  protected _config: OC;

  constructor(config: OC) {
    this._config = config;
  }

  initialize(params: IterationParams): Promise<void> {
    return Promise.resolve();
  }

  abstract write(content: C, params: IterationParams): Promise<OutputReturnValue<OR>>;

  abstract copy(content: C, params: IterationParams): Promise<OutputReturnValue<OR>>;

  complete(params: IterationParams): Promise<void> {
    return Promise.resolve();
  }

  error(params: IterationParams): Promise<void> {
    return Promise.resolve();
  }
}
export default OutputBase;
