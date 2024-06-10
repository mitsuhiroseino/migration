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
  protected async _write(content: Content, params: IterationParams): Promise<void> {}

  protected _getWriteResult(content: Content, params: IterationParams): OutputReturnValue<OutputResultBase> {
    return this._getResult(params);
  }

  protected async _copy(params: IterationParams): Promise<void> {}

  protected _getCopyResult(params: IterationParams): OutputReturnValue<OutputResultBase> {
    return this._getResult(params);
  }

  protected async _move(params: IterationParams): Promise<void> {}

  protected _getMoveResult(params: IterationParams): OutputReturnValue<OutputResultBase> {
    return this._getResult(params);
  }

  private _getResult(params: IterationParams): OutputReturnValue<OutputResultBase> {
    return {
      status: MIGRATION_ITEM_STATUS.UNKNOWN,
    };
  }
}

OutputFactory.register(IO_TYPE.DATA, DataOutput);
export default DataOutput;
