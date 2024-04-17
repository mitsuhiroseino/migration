import isString from 'lodash/isString';
import operate, { OperationConfig } from '../operate';
import { Content, IterationParams } from '../types';
import asArray from '../utils/asArray';
import catchError from '../utils/catchError';
import inheritConfig from './helpers/inheritConfig';
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
  config: MigrationJobConfig<OC>,
  params: IterationParams,
): Promise<Content> {
  const {
    initialize,
    formatter: format,
    preFormatting,
    postFormatting,
    formatterOptions,
    operations,
    finalize,
  } = config;
  const { _inputPath, _outputPath } = params;

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
      content = await format(content, { ...(preFormatting as typeof formatterOptions), filepath: _inputPath });
    } catch (e) {
      catchError(e, 'Error in pre-formatting', config);
      return content;
    }
  }

  let migrated;
  if (operations) {
    // 操作
    try {
      const operateConfigs: OperationConfig[] = asArray(operations).map((operation) =>
        inheritConfig(operation, config),
      );
      migrated = await operate(content, operateConfigs, params);
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
      migrated.content = await format(migrated.content, {
        ...(postFormatting as typeof formatterOptions),
        filepath: _outputPath,
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
