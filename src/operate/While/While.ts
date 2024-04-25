import { Content } from '../../types';
import isMatch from '../../utils/isMatch';
import OperationFactory from '../OperationFactory';
import ParentOperationBase from '../ParentOperationBase';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import { WhileConfig } from './types';

/**
 * 条件に合致している間は配下のオペレーションを繰り返す
 */
class While extends ParentOperationBase<Content, WhileConfig> {
  async operate(content: Content, params: OperationParams): Promise<Content> {
    const { condition } = this._config;
    let currentParams = params;
    let currentContent = content;

    // 条件に合致している間は繰り返す
    while (isMatch(currentContent, condition, currentParams)) {
      const oldContent = currentContent;
      currentContent = super.operate(oldContent, currentParams);
      currentParams._content = oldContent;
    }

    return currentContent;
  }
}

export default While;
OperationFactory.register(OPERATION_TYPE.WHILE, While);
