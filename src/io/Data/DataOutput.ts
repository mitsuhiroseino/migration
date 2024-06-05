import { MIGRATION_ITEM_STATUS } from '../../constants';
import { Content, IterationParams } from '../../types';
import OutputBase from '../OutputBase';
import OutputFactory from '../OutputFactory';
import { IO_TYPE } from '../constants';
import { OutputResultBase, OutputReturnValue } from '../types';
import { DataOutputConfig, DataOutputResult } from './types';

/**
 * データ出力
 */
class DataOutput extends OutputBase<Content, DataOutputConfig, DataOutputResult> {
  async write(content: any, params: IterationParams): Promise<OutputReturnValue<OutputResultBase>> {
    return {
      result: {},
      status: MIGRATION_ITEM_STATUS.UNKNOWN,
    };
  }

  async copy(params: IterationParams): Promise<OutputReturnValue<OutputResultBase>> {
    return {
      result: {},
      status: MIGRATION_ITEM_STATUS.UNKNOWN,
    };
  }

  async move(params: IterationParams): Promise<OutputReturnValue<OutputResultBase>> {
    return {
      result: {},
      status: MIGRATION_ITEM_STATUS.UNKNOWN,
    };
  }
}

OutputFactory.register(IO_TYPE.DATA, DataOutput);
export default DataOutput;
