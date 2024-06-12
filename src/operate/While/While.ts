import { OPERATION_STATUS, OPERATION_STATUS_PRIORITY } from '../../constants';
import { Content, OperationResult, OperationStatus } from '../../types';
import isMatch from '../../utils/isMatch';
import updateStatus from '../../utils/updateStatus';
import OperationBundlerBase from '../OperationBundlerBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import { WhileConfig } from './types';

/**
 * 条件に合致している間は配下のオペレーションを繰り返す
 */
class While extends OperationBundlerBase<Content, WhileConfig> {
  protected async _operate(content: Content, params: OperationParams): Promise<OperationResult<Content>> {
    const { condition } = this._config;
    let status: OperationStatus = OPERATION_STATUS.UNPROCESSED;
    let currentParams = params;
    let currentContent = content;

    // 条件に合致している間は繰り返す
    while (isMatch(currentContent, condition, currentParams)) {
      const oldContent = currentContent;
      const result = await super._operate(oldContent, currentParams);
      currentContent = result.content;
      currentParams._content = oldContent;
      status = updateStatus(status, result.operationStatus, OPERATION_STATUS_PRIORITY);
    }

    return { operationStatus: status, content: currentContent };
  }
}

export default While;
OperationFactory.register(OPERATION_TYPE.WHILE, While);
