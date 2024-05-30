import { MIGRATION_ITEM_STATUS } from '../../../constants';
import { Content, IterationParams } from '../../../types';
import { IO_TYPE } from '../../constants';
import { OutputResultBase, OutputReturnValue } from '../../types';
import OutputBase from '../OutputBase';
import OutputFactory from '../OutputFactory';
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
class Any extends OutputBase<Content, AnyOutputConfig, AnyOutputResult> {
  async write(content: any, params: IterationParams): Promise<OutputReturnValue<OutputResultBase>> {
    const { write: writeFn = getEmptyResult } = this._config;
    return writeFn(content, params, this._config);
  }

  async copy(params: IterationParams): Promise<OutputReturnValue<OutputResultBase>> {
    const { copy: copyFn = getEmptyResult } = this._config;
    return copyFn(params, this._config);
  }

  async move(params: IterationParams): Promise<OutputReturnValue<OutputResultBase>> {
    const { move: moveFn = getEmptyResult } = this._config;
    return moveFn(params, this._config);
  }
}

OutputFactory.register(IO_TYPE.ANY, Any);
export default Any;
