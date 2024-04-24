import { Operation, OperationParams, OperationResult } from './types';

/**
 * 処理対象内の文字列をコンフィグに従って置換する
 * @param content 処理対象
 * @param configs 置換設定
 * @param params 置換前・後の文字列に埋め込むパラメーター
 * @returns
 */
export default async function operate<C>(
  content: C,
  operations: Operation<any>[],
  params: OperationParams,
): Promise<OperationResult<C>> {
  // 処理対象の操作を行う
  const results: string[] = [];
  let currentContent = content;
  for (const operation of operations) {
    // 操作
    if (operation && operation.isOperable(currentContent, params)) {
      // オペレーションを直列で実行
      const operatedContent = await operation.operate(currentContent, params);
      if (currentContent !== operatedContent) {
        results.push(operation.getOperationId());
        currentContent = operatedContent;
      }
    }
  }
  return { content: currentContent, results };
}
