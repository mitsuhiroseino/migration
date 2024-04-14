import isString from 'lodash/isString';
import { CONTENT_TYPE } from '../../constants';
import asArray from '../../utils/asArray';
import finishDynamicValue from '../../utils/finishDynamicValue';
import replace, { FlexiblePattern, StaticPattern } from '../../utils/replace';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { Operation, OperationParams } from '../types';
import { AddConfig } from './types';

/**
 * 文字列を追加する操作
 * @param content 処理対象
 * @param config 操作設定
 * @param params 1繰り返し毎のパラメーター
 * @returns 処理結果
 */
const Add: Operation<string, AddConfig> = async (content: string, config: AddConfig, params: OperationParams) => {
  let {
    patterns,
    preservePatterns,
    additionalString,
    preserveAdditionalString,
    addPosition = 'before',
    ...rest
  } = config;
  const additionalStrOptions = {
    ...rest,
    content,
    preserveString: preserveAdditionalString,
    preserveFunction: preserveAdditionalString,
  };
  const patternsOptions = {
    ...rest,
    content,
    preserveString: preservePatterns,
    preserveFunction: preservePatterns,
  };
  // 前処理
  const additionalStr = finishDynamicValue(additionalString, params, additionalStrOptions);

  let cnt = content;
  if (patterns == null) {
    // patternが無い場合はコンテンツ自体の前方or後方に追加
    cnt = addPosition === 'before' ? `${additionalStr}${cnt}` : `${cnt}${additionalStr}`;
  } else {
    for (const pattern of asArray(patterns)) {
      const ptn = finishDynamicValue<FlexiblePattern, StaticPattern>(pattern, params, patternsOptions);
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
  }

  return cnt;
};
export default Add;
OperationFactory.register(OPERATION_TYPE.ADD, Add, CONTENT_TYPE.TEXT);
