import { MIGRATION_ITEM_STATUS } from '../../constants';
import { Content, IterationParams } from '../../types';
import OutputBase from '../OutputBase';
import OutputFactory from '../OutputFactory';
import { IO_TYPE } from '../constants';
import { OutputResultBase, OutputReturnValue } from '../types';
import { AnyOutputConfig, AnyOutputResult } from './types';

const getEmptyResult = () => ({
  result: {},
  status: MIGRATION_ITEM_STATUS.NONE,
});

/**
 * 任意の出力
 * @param config 入力設定
 * @param params 1繰り返し毎のパラメーター
 */
class AnyOutput extends OutputBase<Content, AnyOutputConfig, AnyOutputResult> {
  async write(content: any, params: IterationParams): Promise<OutputReturnValue<OutputResultBase>> {
    if (!this._config.dryRun) {
      const { write: writeFn = getEmptyResult } = this._config;
      return await writeFn(content, params, this._config);
    }
    return {
      status: MIGRATION_ITEM_STATUS.CONVERTED,
      result: {},
    };
  }

  async copy(params: IterationParams): Promise<OutputReturnValue<OutputResultBase>> {
    if (!this._config.dryRun) {
      const { copy: copyFn = getEmptyResult } = this._config;
      return await copyFn(params, this._config);
    }
    return {
      status: MIGRATION_ITEM_STATUS.COPIED,
      result: {},
    };
  }

  async move(params: IterationParams): Promise<OutputReturnValue<OutputResultBase>> {
    if (!this._config.dryRun) {
      const { move: moveFn = getEmptyResult } = this._config;
      return await moveFn(params, this._config);
    }
    return {
      status: MIGRATION_ITEM_STATUS.MOVED,
      result: {},
    };
  }
}

OutputFactory.register(IO_TYPE.ANY, AnyOutput);
export default AnyOutput;
