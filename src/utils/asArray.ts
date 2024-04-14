/**
 * 配列に変換する
 * @param arg 配列または配列の要素
 * @returns
 */
export default function asArray<I = unknown>(arg: I | I[] | null | undefined): I[] {
  if (arg == null) {
    return [];
  } else if (Array.isArray(arg)) {
    return arg;
  } else {
    return [arg];
  }
}
