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
class NoopInput extends OutputBase<Content, NoopOutputConfig, NoopOutputResult> {
  async write(content: any, params: IterationParams): Promise<OutputReturnValue<OutputResultBase>> {
    return {
      result: {},
      status: MIGRATION_ITEM_STATUS.NONE,
    };
  }

  async copy(params: IterationParams): Promise<OutputReturnValue<OutputResultBase>> {
    return {
      result: {},
      status: MIGRATION_ITEM_STATUS.NONE,
    };
  }

  async move(params: IterationParams): Promise<OutputReturnValue<OutputResultBase>> {
    return {
      result: {},
      status: MIGRATION_ITEM_STATUS.NONE,
    };
  }
}

OutputFactory.register(IO_TYPE.NOOP, NoopInput);
export default NoopInput;
