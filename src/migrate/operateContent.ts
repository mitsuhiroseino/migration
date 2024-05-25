import isString from 'lodash/isString';
import { OPERATION_STATUS } from '../constants';
import operate from '../operate';
import { Content, IterationParams, OperateContentConfig, OperationResult, OperationStatus } from '../types';
import catchError from '../utils/catchError';
import finishFormattingOptions from '../utils/finishFormattingOptions';
import format from '../utils/format';
import getOperationStatus from '../utils/getOperationStatus';

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
      content = await initialize(content, { ...config }, { ...params });
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
      operationStatus = getOperationStatus(operationStatus, OPERATION_STATUS.PROCESSED);
    }
  }

  if (operations) {
    // 操作
    try {
      const result = await operate(content, operations, params);
      content = result.content;
      operationStatus = getOperationStatus(operationStatus, result.operationStatus);
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
      operationStatus = getOperationStatus(operationStatus, OPERATION_STATUS.PROCESSED);
    }
  }

  // 任意の後処理
  if (finalize) {
    try {
      content = await finalize(content, { ...config }, { ...params });
    } catch (e) {
      catchError(e, 'Error in finalizing', config);
      return { operationStatus: OPERATION_STATUS.ERROR, content };
    }
  }

  return { operationStatus, content };
}
