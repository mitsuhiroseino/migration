import { OPERATION_STATUS, OPERATION_STATUS_PRIORITY } from '../constants';
import operate from '../operate';
import { Content, IterationParams, OperateContentConfig, OperationResult, OperationStatus } from '../types';
import applyIf from '../utils/applyIf';
import catchError from '../utils/catchError';
import updateStatus from '../utils/updateStatus';

/**
 * コンテンツの変換処理を行う
 * @param content
 * @param config
 * @param params
 * @returns
 */
export default async function operateContent(
  content: Content,
  config: OperateContentConfig,
  params: IterationParams,
): Promise<OperationResult<Content>> {
  const { onOperationsStart, onOperationsEnd, operations, onError } = config;
  let operationStatus: OperationStatus = OPERATION_STATUS.UNPROCESSED;

  // 任意の前処理
  if (onOperationsStart) {
    try {
      const updatedContent = await onOperationsStart(content, { ...config }, { ...params });
      if (updatedContent !== undefined && updatedContent !== content) {
        content = updatedContent;
        operationStatus = OPERATION_STATUS.PROCESSED;
      }
    } catch (e) {
      applyIf(onError, [e, config, params]);
      catchError(e, 'Error in operations start', config);
      return { operationStatus: OPERATION_STATUS.ERROR, content };
    }
  }

  if (operations) {
    // 操作
    try {
      const result = await operate(content, operations, params);
      content = result.content;
      operationStatus = updateStatus(operationStatus, result.operationStatus, OPERATION_STATUS_PRIORITY);
    } catch (e) {
      applyIf(onError, [e, config, params]);
      catchError(e, 'Error in operation', config);
      return { operationStatus: OPERATION_STATUS.ERROR, content };
    }
  }

  // 任意の後処理
  if (onOperationsEnd) {
    try {
      const updatedContent = await onOperationsEnd(operationStatus, content, { ...config }, { ...params });
      if (updatedContent !== undefined && updatedContent !== content) {
        content = updatedContent;
        operationStatus = OPERATION_STATUS.PROCESSED;
      }
    } catch (e) {
      applyIf(onError, [e, config, params]);
      catchError(e, 'Error in operations end', config);
      return { operationStatus: OPERATION_STATUS.ERROR, content };
    }
  }

  return { operationStatus, content };
}
