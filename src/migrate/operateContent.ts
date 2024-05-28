import isString from 'lodash/isString';
import { OPERATION_STATUS, OPERATION_STATUS_PRIORITY } from '../constants';
import operate from '../operate';
import { Content, IterationParams, OperateContentConfig, OperationResult, OperationStatus } from '../types';
import catchError from '../utils/catchError';
import finishFormattingOptions from '../utils/finishFormattingOptions';
import format from '../utils/format';
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
  const { initialize, preFormatting, postFormatting, formatterOptions, finalize, operations } = config;
  const { _inputItem } = params;
  let operationStatus: OperationStatus = OPERATION_STATUS.UNPROCESSED;

  // 任意の前処理
  if (initialize) {
    try {
      const updatedParams = await initialize(content, { ...config }, { ...params });
      if (updatedParams) {
        params = updatedParams;
      }
    } catch (e) {
      catchError(e, 'Error in initializing', config);
      return { operationStatus: OPERATION_STATUS.ERROR, content };
    }
  }

  if (preFormatting && isString(content)) {
    // 処理開始前のフォーマットあり
    const preFormattingOptions = finishFormattingOptions(preFormatting, formatterOptions, params);
    const before = content;
    try {
      content = await format(content, { filepath: _inputItem as string, ...preFormattingOptions });
    } catch (e) {
      catchError(e, 'Error in pre-formatting', config);
      return { operationStatus: OPERATION_STATUS.ERROR, content };
    }
    if (before !== content) {
      operationStatus = updateStatus(operationStatus, OPERATION_STATUS.PROCESSED, OPERATION_STATUS_PRIORITY);
    }
  }

  if (operations) {
    // 操作
    try {
      const result = await operate(content, operations, params);
      content = result.content;
      operationStatus = updateStatus(operationStatus, result.operationStatus, OPERATION_STATUS_PRIORITY);
    } catch (e) {
      catchError(e, 'Error in operation', config);
      return { operationStatus: OPERATION_STATUS.ERROR, content };
    }
  }

  if (postFormatting && isString(content)) {
    // 処理終了後のフォーマットあり
    const postFormattingOptions = finishFormattingOptions(postFormatting, formatterOptions, params);
    const before = content;
    try {
      content = await format(content, {
        filepath: _inputItem as string,
        ...postFormattingOptions,
      });
    } catch (e) {
      catchError(e, 'Error in post-formatting', config);
      return { operationStatus: OPERATION_STATUS.ERROR, content };
    }
    if (before !== content) {
      operationStatus = updateStatus(operationStatus, OPERATION_STATUS.PROCESSED, OPERATION_STATUS_PRIORITY);
    }
  }

  // 任意の後処理
  if (finalize) {
    try {
      await finalize(content, { ...config }, { ...params });
    } catch (e) {
      catchError(e, 'Error in finalizing', config);
      return { operationStatus: OPERATION_STATUS.ERROR, content };
    }
  }

  return { operationStatus, content };
}
