import { MIGRATION_ITEM_STATUS } from '../../../constants';
import { Content, IterationParams } from '../../../types';
import OutputFactory from '../OutputFactory';
import { OUTPUT_TYPE } from '../constants';
import { Output, OutputReturnValue } from '../types';
import { NoopOutputConfig, NoopOutputResult } from './types';

/**
 * 何もしない
 * @param config 入力設定
 * @param params 1繰り返し毎のパラメーター
 */
const Noop: Output<Content, NoopOutputConfig, NoopOutputResult> = function (config) {
  return async (content: Content, params: IterationParams): Promise<OutputReturnValue<NoopOutputResult>> => {
    return {
      status: MIGRATION_ITEM_STATUS.PROCESSED,
    };
  };
};
OutputFactory.register(OUTPUT_TYPE.NOOP, Noop);
export default Noop;
