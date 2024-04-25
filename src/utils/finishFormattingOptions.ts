import isFunction from 'lodash/isFunction';
import { IterationParams } from '../types';
import { FormatOptions } from './format';

export type Formatting = boolean | FormatOptions | ((params: IterationParams) => FormatOptions);

/**
 * フォーマットオプションを取得する
 * @param formattingOptions
 * @param defaultFormattingOptions
 * @param params
 * @returns
 */
export default function finishFormattingOptions(
  formattingOptions: Formatting,
  defaultFormattingOptions: FormatOptions,
  params: IterationParams,
): FormatOptions {
  if (!formattingOptions) {
    return null;
  } else if (formattingOptions === true) {
    return defaultFormattingOptions;
  } else if (isFunction(formattingOptions)) {
    return formattingOptions(params);
  } else {
    return formattingOptions;
  }
}
