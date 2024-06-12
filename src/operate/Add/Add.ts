import isString from 'lodash/isString';
import { CONTENT_TYPE } from '../../constants';
import finishDynamicValue from '../../utils/finishDynamicValue';
import replace, { FlexiblePattern, StaticPattern } from '../../utils/replace';
import ImmutableOperationBase from '../ImmutableOperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import { AddConfig } from './types';

/**
 * 文字列を追加する操作
 */
class Add extends ImmutableOperationBase<string, AddConfig> {
  readonly contentTypes = CONTENT_TYPE.TEXT;

  protected async _operateContent(content: string, params: OperationParams): Promise<string> {
    let {
      pattern,
      preservePattern,
      additionalString,
      preserveAdditionalString,
      addPosition = 'before',
      ...rest
    } = this._config;
    const additionalStrOptions = {
      ...rest,
      content,
      preserveString: preserveAdditionalString,
      preserveFunction: preserveAdditionalString,
    };
    const patternOptions = {
      ...rest,
      content,
      preserveString: preservePattern,
      preserveFunction: preservePattern,
    };
    // 前処理
    const additionalStr = finishDynamicValue(additionalString, params, additionalStrOptions);

    let cnt = content;
    if (pattern == null) {
      // patternが無い場合はコンテンツ自体の前方or後方に追加
      cnt = addPosition === 'before' ? `${additionalStr}${cnt}` : `${cnt}${additionalStr}`;
    } else {
      const ptn = finishDynamicValue<FlexiblePattern, StaticPattern>(pattern, params, patternOptions);
      if (isString(ptn)) {
        // patternが文字列の場合はpatternの前方or後方に追加
        const replacement = addPosition === 'before' ? `${additionalStr}${ptn}` : `${ptn}${additionalStr}`;
        // 置換の実行
        cnt = replace(cnt, ptn, replacement);
      } else {
        // patternが正規表現の場合はpatternで検出された文字列の前方or後方に追加
        const replacement =
          addPosition === 'before'
            ? (substring: string) => `${additionalStr}${substring}`
            : (substring: string) => `${substring}${additionalStr}`;
        // 置換の実行
        cnt = replace(cnt, ptn, replacement);
      }
    }

    return cnt;
  }
}
export default Add;
OperationFactory.register(OPERATION_TYPE.ADD, Add);
