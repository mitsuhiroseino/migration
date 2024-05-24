import { Content } from '../../types';
import isMatch from '../../utils/isMatch';
import OperationBundlerBase from '../OperationBundlerBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_STATUS, OPERATION_STATUS_PRIORITY, OPERATION_TYPE } from '../constants';
import { OperationParams, OperationResult, OperationStatus } from '../types';
import { WhileConfig } from './types';

/**
 * 条件に合致している間は配下のオペレーションを繰り返す
 */
class While extends OperationBundlerBase<Content, WhileConfig> {
  async operate(content: Content, params: OperationParams): Promise<OperationResult<Content>> {
    const { condition } = this._config;
    let status: OperationStatus = OPERATION_STATUS.UNCHANGED;
    let currentParams = params;
    let currentContent = content;

    // 条件に合致している間は繰り返す
    while (isMatch(currentContent, condition, currentParams)) {
      const oldContent = currentContent;
      const result = await super.operate(oldContent, currentParams);
      currentContent = result.content;
      currentParams._content = oldContent;
      const operationStatus = result.status;
      if (OPERATION_STATUS_PRIORITY[status] < OPERATION_STATUS_PRIORITY[operationStatus]) {
        status = operationStatus;
      }
    }

    return { status, content: currentContent };
  }
}

export default While;
OperationFactory.register(OPERATION_TYPE.WHILE, While);
