import { Content, DiffParams, IterationParams } from '../../../types';
import toAsyncIterable from '../../../utils/toAsyncIterable';
import { IO_TYPE } from '../../constants';
import { InputReturnValue } from '../../types';
import InputBase from '../InputBase';
import InputFactory from '../InputFactory';
import { DataInputConfig, DataInputResult } from './types';

const getDataInputResult = (data: any, args?: any[]) => toAsyncIterable(data, args);

/**
 * データ
 */
class Data extends InputBase<Content, DataInputConfig, DataInputResult> {
  read(params: IterationParams): AsyncIterable<InputReturnValue<Content, DataInputResult>> {
    const { data } = this._config;
    return getDataInputResult(data, [params]);
  }

  copy(params: IterationParams): AsyncIterable<InputReturnValue<Content, DataInputResult>> {
    const { data } = this._config;
    return getDataInputResult(data, [params]);
  }

  move(params: IterationParams): AsyncIterable<InputReturnValue<Content, DataInputResult>> {
    const { data } = this._config;
    return getDataInputResult(data, [params]);
  }

  async delete(params: IterationParams): Promise<DiffParams> {
    return {};
  }
}
InputFactory.register(IO_TYPE.DATA, Data);
export default Data;
