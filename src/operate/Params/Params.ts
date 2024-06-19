import { Content, OperationResult } from '../../types';
import OperationBundlerBase from '../OperationBundlerBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import { ParamsConfig } from './types';

/**
 * パラメーターを更新して子の操作を実行する
 */
class Params extends OperationBundlerBase<Content, ParamsConfig<Content>> {
  protected async _operate(content: Content, params: OperationParams): Promise<OperationResult<Content>> {
    // パラメーターの更新
    const diff = await this._config.createDiff(content, { ...params });
    // 新しいパラメーターで子操作を実行
    return super._operate(content, { ...params, ...diff });
  }
}
export default Params;
OperationFactory.register(OPERATION_TYPE.PARAMS, Params);
