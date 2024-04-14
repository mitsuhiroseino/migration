import isFunction from 'lodash/isFunction';
import isRegExp from 'lodash/isRegExp';
import isString from 'lodash/isString';

/**
 * 条件
 * 下記の条件に当てはまった場合にtrueを返す
 * - 文字列で指定した場合: valueの一部に対象の文字列が含まれている
 * - 正規表現の場合: 正規表現のメソッドtestで戻り値がtrue
 * - 関数の場合: 戻り値がtrue
 */
export type Condition<O = any> = string | RegExp | ((value: any, options?: O) => boolean);

/**
 * 値が条件に一致しているか判定する
 * @param value 値
 * @param condition 条件
 * @param options 条件が関数だった場合に引数として渡すオプション
 * @returns
 */
export default function isMatch<V, O>(value: V, condition?: Condition, options?: O): boolean {
  if (condition == null) {
    // 条件なし
    return true;
  } else if (isFunction(condition)) {
    // 関数の戻り値で判断
    return condition(value, options);
  } else if (isString(value)) {
    if (isString(condition)) {
      // 文字列が一致
      return value.includes(condition);
    } else if (isRegExp(condition)) {
      // 正規表現に一致
      return condition.test(value);
    }
  }
  return false;
}
