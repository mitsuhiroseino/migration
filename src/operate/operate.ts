import asArray from '../utils/asArray';
import getContentType from '../utils/getContentType';
import isMatch from '../utils/isMatch';
import throwError from '../utils/throwError';
import OperationFactory from './OperationFactory';
import { OperationConfig, OperationParams, OperationResult } from './types';

/**
 * 処理対象内の文字列をコンフィグに従って置換する
 * @param content 処理対象
 * @param configs 置換設定
 * @param params 置換前・後の文字列に埋め込むパラメーター
 * @returns
 */
export default async function operate<C, OC extends OperationConfig>(
  content: C,
  configs: OC | OC[],
  params: OperationParams,
): Promise<OperationResult<C, OC>> {
  const operationConfigs = asArray(configs);

  // 置換情報を基に処理対象の置換
  const results: OC[] = [];
  let currentContent = content;
  for (const operationConfig of operationConfigs) {
    // 置換
    const { type, filter } = operationConfig;
    const processTarget = currentContent != null ? isMatch(currentContent, filter, params) : false;
    if (processTarget) {
      const contentType = getContentType(currentContent);
      const operation = OperationFactory.get(type, contentType);
      if (operation) {
        // オペレーションを直列で実行
        const operatedContent = await operation(currentContent, operationConfig, params);
        if (currentContent !== operatedContent) {
          results.push({ ...operationConfig } as OC);
          currentContent = operatedContent;
        }
      } else {
        throwError(`There was no ${contentType} operation "${type}".`, operationConfig);
      }
    }
  }
  return { content: currentContent, results };
}
