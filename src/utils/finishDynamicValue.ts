import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import replacePlaceholders, {
  ReplacePlaceholdersOptions,
  ReplacementValues,
  getReplacePlaceholdersOptions,
} from './replacePlaceholders';

export { ReplacementValues } from './replacePlaceholders';

export type FinishDynamicValueOptions = ReplacePlaceholdersOptions & {
  /**
   * 文字列の場合はそのまま返す
   */
  preserveString?: boolean;

  /**
   * 関数の場合はそのまま返す
   */
  preserveFunction?: boolean;

  /**
   * targetが関数の場合に第二引数に渡すオプション値
   */
  fnOptions?: { [key: string]: unknown };
};

export function getFinishDynamicValueOptions<O extends FinishDynamicValueOptions>(options: O) {
  const { preserveString, preserveFunction, fnOptions } = options;
  return {
    preserveString,
    preserveFunction,
    fnOptions,
    ...getReplacePlaceholdersOptions(options),
  };
}

/**
 * targetが文字列の場合はプレイスホルダーにvaluesの値を埋め込んだ文字列を返し、
 * targetが関数の場合はvaluesを引数に渡して実行した結果を返し、
 * それ以外の場合はそのままの値を返す。
 * @param target
 * @param values
 * @param options
 * @returns
 */
export default function finishDynamicValue<T, R>(
  target: T,
  values: ReplacementValues,
  options: FinishDynamicValueOptions = {},
): R {
  const { preserveString, preserveFunction, fnOptions, ...rest } = options;
  if (!preserveString && isString(target)) {
    // 文字列の場合はプレイスホルダーを置換
    return replacePlaceholders(target, values, rest) as R;
  } else if (!preserveFunction && isFunction(target)) {
    // 関数の場合は戻り値を返す
    return target(values, fnOptions);
  } else {
    // 上記以外はそのまま返す
    return target as unknown as R;
  }
}
