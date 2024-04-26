import isString from 'lodash/isString';
import operate from '../operate';
import { Content, IterationParams, OperateContentConfig } from '../types';
import catchError from '../utils/catchError';
import finishFormattingOptions from '../utils/finishFormattingOptions';
import format from '../utils/format';

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
): Promise<Content> {
  const { initialize, preFormatting, postFormatting, formatterOptions, finalize, operations } = config;
  const { _inputItem } = params;

  // 任意の前処理
  if (initialize) {
    try {
      content = await initialize(content, { ...config }, { ...params });
    } catch (e) {
      catchError(e, 'Error in initializing', config);
      return content;
    }
  }

  if (preFormatting && isString(content)) {
    // 処理開始前のフォーマットあり
    const preFormattingOptions = finishFormattingOptions(preFormatting, formatterOptions, params);
    try {
      content = await format(content, { filepath: _inputItem as string, ...preFormattingOptions });
    } catch (e) {
      catchError(e, 'Error in pre-formatting', config);
      return content;
    }
  }

  if (operations) {
    // 操作
    try {
      content = await operate(content, operations, params);
    } catch (e) {
      catchError(e, 'Error in operation', config);
      return content;
    }
  }

  if (postFormatting && isString(content)) {
    // 処理終了後のフォーマットあり
    const postFormattingOptions = finishFormattingOptions(postFormatting, formatterOptions, params);
    try {
      content = await format(content, {
        filepath: _inputItem as string,
        ...postFormattingOptions,
      });
    } catch (e) {
      catchError(e, 'Error in post-formatting', config);
      return content;
    }
  }

  // 任意の後処理
  if (finalize) {
    try {
      content = await finalize(content, { ...config }, { ...params });
    } catch (e) {
      catchError(e, 'Error in finalizing', config);
      return content;
    }
  }

  return content;
}
