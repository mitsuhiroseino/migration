import { Content, DiffParams, IterationParams } from '../../../types';
import toAsyncIterable from '../../../utils/toAsyncIterable';
import { IO_TYPE } from '../../constants';
import { InputReturnValue } from '../../types';
import InputBase from '../InputBase';
import InputFactory from '../InputFactory';
import { DataInputConfig, DataInputResult } from './types';

const getDataInputResult = ({ content, result }: DataInputConfig, params: IterationParams) =>
  toAsyncIterable({ content, result }, [params]);

/**
 * データ
 */
class Data extends InputBase<Content, DataInputConfig, DataInputResult> {
  read(params: IterationParams): AsyncIterable<InputReturnValue<Content, DataInputResult>> {
    return getDataInputResult(this._config, params);
  }

  copy(params: IterationParams): AsyncIterable<InputReturnValue<Content, DataInputResult>> {
    return getDataInputResult(this._config, params);
  }

  move(params: IterationParams): AsyncIterable<InputReturnValue<Content, DataInputResult>> {
    return getDataInputResult(this._config, params);
  }

  async delete(params: IterationParams): Promise<DiffParams> {
    return {};
  }
}
InputFactory.register(IO_TYPE.DATA, Data);
export default Data;
