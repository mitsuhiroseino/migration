import isString from 'lodash/isString';
import operate, { Operation, OperationConfig } from '../operate';
import { Content, IterationParams } from '../types';
import catchError from '../utils/catchError';
import { MigrationJobConfig } from './types';

/**
 * コンテンツの変換処理を行う
 * @param content
 * @param config
 * @param params
 * @returns
 */
export default async function operateContent<OC extends OperationConfig>(
  content: Content,
  config: Omit<MigrationJobConfig<OC>, 'operation'>,
  params: IterationParams,
  operations: Operation<any>[],
): Promise<Content> {
  const { initialize, formatter: format, preFormatting, postFormatting, formatterOptions, finalize } = config;
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
    try {
      const formatConfig = preFormatting as typeof formatterOptions;
      content = await format(content, { ...formatConfig, filepath: _inputItem as string });
    } catch (e) {
      catchError(e, 'Error in pre-formatting', config);
      return content;
    }
  }

  let migrated;
  if (operations) {
    // 操作
    try {
      migrated = await operate(content, operations, params);
    } catch (e) {
      catchError(e, 'Error in operation', config);
      return content;
    }
  } else {
    migrated = { content, results: [] };
  }

  if (postFormatting && isString(migrated.content)) {
    // 処理終了後のフォーマットあり
    try {
      const formatConfig = postFormatting as typeof formatterOptions;
      migrated.content = await format(migrated.content, {
        ...formatConfig,
        filepath: _inputItem as string,
      });
    } catch (e) {
      catchError(e, 'Error in post-formatting', config);
      return migrated.content;
    }
  }

  // 任意の後処理
  if (finalize) {
    try {
      migrated.content = await finalize(migrated.content, { ...config }, { ...params }, migrated.results);
    } catch (e) {
      catchError(e, 'Error in finalizing', config);
      return migrated.content;
    }
  }

  return migrated.content;
}
