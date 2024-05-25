import { OPERATION_STATUS, OPERATION_STATUS_PRIORITY } from '../constants';
import { OperationResult, OperationStatus } from '../types';
import updateStatus from '../utils/updateStatus';
import { Operation, OperationParams } from './types';

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
  let status: OperationStatus = OPERATION_STATUS.UNPROCESSED;
  let currentContent = content;
  for (const operation of operations) {
    // 操作
    if (operation && operation.isOperable(currentContent, params)) {
      // オペレーションを直列で実行
      const result = await operation.operate(currentContent, params);
      currentContent = result.content;
      status = updateStatus(status, result.operationStatus, OPERATION_STATUS_PRIORITY);
    }
  }
  return { operationStatus: status, content: currentContent };
}
