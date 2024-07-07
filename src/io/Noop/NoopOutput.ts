import { MIGRATION_ITEM_STATUS } from '../../constants';
import { Content, IterationParams } from '../../types';
import OutputBase from '../OutputBase';
import OutputFactory from '../OutputFactory';
import { IO_TYPE } from '../constants';
import { OutputResultBase, OutputReturnValue } from '../types';
import { NoopOutputConfig, NoopOutputResult } from './types';

/**
 * 何もしない
 * @param config 入力設定
 * @param params 1繰り返し毎のパラメーター
 */
class NoopOutput extends OutputBase<Content, NoopOutputConfig, NoopOutputResult> {
  protected async _write(content: Content, params: IterationParams): Promise<void> {}

  protected _getWriteResult(content: Content, params: IterationParams): OutputReturnValue<OutputResultBase> {
    return {
      status: MIGRATION_ITEM_STATUS.NOTHING,
    };
  }

  protected async _copy(params: IterationParams): Promise<void> {}

  protected _getCopyResult(params: IterationParams): OutputReturnValue<OutputResultBase> {
    return {
      status: MIGRATION_ITEM_STATUS.NOTHING,
    };
  }

  protected async _move(params: IterationParams): Promise<void> {}

  protected _getMoveResult(params: IterationParams): OutputReturnValue<OutputResultBase> {
    return {
      status: MIGRATION_ITEM_STATUS.NOTHING,
    };
  }
}

OutputFactory.register(IO_TYPE.NOOP, NoopOutput);
export default NoopOutput;
